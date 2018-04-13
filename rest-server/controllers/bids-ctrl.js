const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');
const {jwtDecode} = require('./lib');
const passport = require('passport');
require('../auth/passport')(passport);

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_BID,
  GET_ALL,
  GET_ONE,
  DELETE,
  POST
} = require('../kafka-client/constants');


/**
 * @swagger
 * /bids:
 *  get:
 *    description: Retrieve all bids
 *    tags:
 *      - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        in : query
 *        required: false
 *        type: string
 *        description: retrieve bids as bidder
 *      - name: isActive
 *        in: query
 *        required: false
 *        type: boolean
 *        description: filter active ones
 *    responses:
 *      200:
 *        description: bids
 */
router.get('/',(req, res) => {
  kafkaClient.make_request(
    FLC_TPC_BID,
    GET_ALL,
    {userId: req.query.userId, isActive: req.query.isActive},
    (err, docs) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, docs);
    });
});

/**
 * @swagger
 * /bids/{bidId}:
 *  get:
 *    description: retrieve a bid
 *    tags:
 *      - bids
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: bidId
 *        description: bid ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: a bid
 */
router.get('/:bidId', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  const bidId = req.params.bidId;
  if ( bidId === undefined ) handleRes.sendBadRequest(res, "Invalid Bid GET Request");
  else
    kafkaClient.make_request(
      FLC_TPC_BID,
      GET_ONE,
      {_id: bidId},
      (err, data) => {
        if (err || data === null) handleRes.sendNotFound(res, err);
        else handleRes.sendDoc(res, data);
      });
});

/**
 * @swagger
 * /bids:
 *  post:
 *    description: New bid for a project
 *    tags:
 *      - bids
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: projectId
 *        description: Id of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: bidPrice
 *        description: bid price for the project
 *        in: formData
 *        required: false
 *        type: number
 *      - name: bidDays
 *        description: bid days for the project
 *        in: formData
 *        required: false
 *        type: number
 *    responses:
 *      201:
 *        description: bid created
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const form = req.body;
  form.userId = user._id;

  kafkaClient.make_request(
    FLC_TPC_BID,
    POST,
    {form},
    (err, data) => {
      if (err) {
        if ( err.code === 11000 ) handleRes.sendBadRequest(res, "User has already bid on this project");
        else handleRes.sendInternalSystemError(res, err);
      }
      else handleRes.sendDoc(res, data);
    });
});

/**
 * @swagger
 * /bids/{bidId}:
 *  delete:
 *    description: delete a bid
 *    tags:
 *      - bids
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: bidId
 *        description: bid ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: a bid
 */
router.delete('/:bidId', function (req, res) {
  const user = jwtDecode(req.header('Authorization'));
  const bidId = req.params.bidId;
  if ( bidId === undefined ) handleRes.sendBadRequest(res, "Invalid Bid Delete Request");
  else
    kafkaClient.make_request(
      FLC_TPC_BID,
      DELETE,
      {_id: bidId, userId: user._id},
      (err, data) => {
        if (err) handleRes.sendInternalSystemError(res, err);
        else {
          if (data.n === 0) handleRes.sendOK(res, "Bid doesn't exist");
          else handleRes.sendOK(res, "Bid deleted");
        }
      });
});

module.exports = router;