const express = require('express');
const router = express.Router();
const Bid = require('../models/bid');
const handleRes = require('./handle-res');


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
 *    responses:
 *      200:
 *        description: bids
 */
router.get('/', (req, res) => {

  const userId = req.query.userId;
  let filter = {};
  if (userId !== undefined) filter.userId = userId;

  Bid.find(filter, (err, docs) => {
    if (err) handleRes.sendNotFound(res, err);
    else handleRes.sendArray(res, docs);
  });
});

/**
 * @swagger
 * /bids/{bidId}:
 *  get:
 *    description: retrieve a bid
 *    tags:
 *       - bids
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
router.get('/:bidId', function (req, res, next) {
  const bidId = req.params.bidId;
  if ( bidId === undefined ) handleRes.sendBadRequest(res, "Invalid Bid GET Request");
  else
    Bid.findOne({_id: bidId}, (err, doc) => {
      if (err || doc === null) handleRes.sendNotFound(res, err);
      else handleRes.sendDoc(res, doc);
    });
});

/**
 * @swagger
 * /bids:
 *  post:
 *    description: New bid for a project
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: user to bid the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: projectId
 *        description: Id of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: employerId
 *        description: Id of the employer
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
router.post('/', (req, res) => {
  const bid = new Bid(req.body);
  bid.save((err) => {
    if (err) handleRes.sendInternalSystemError(res, err);
    else handleRes.sendCreated(res);
  })
});

/**
 * @swagger
 * /bids/{bidId}:
 *  delete:
 *    description: delete a bid
 *    tags:
 *       - bids
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
  const bidId = req.params.bidId;
  if ( bidId === undefined ) handleRes.sendBadRequest(res, "Invalid Bid Delete Request");
  else
    Bid.remove({_id: bidId}, (err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendOK(res);
    });
});



module.exports = router;