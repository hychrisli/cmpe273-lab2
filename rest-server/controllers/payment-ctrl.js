const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');

const passport = require('passport');
require('../auth/passport')(passport);
const {jwtDecode} = require('./lib');

const kafkaClient = require('../kafka-client/client');
const {
  GET_ALL,
  POST,
  FLC_TPC_PAYMENT
} = require('../kafka-client/constants');

/**
 * @swagger
 * /payment:
 *  get:
 *    description: get payment history
 *    tags:
 *      - payment
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: isPayer
 *        description: is for the payer ?
 *        in: query
 *        required: false
 *        type: boolean
 *    responses:
 *      200:
 *        description: payments
 */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));

  const isPayer = req.query.isPayer === undefined ? true : req.query.isPayer;
  let filter = {};
  if (isPayer) filter.payerId = user._id;
  else filter.payeeId = user._id;

  kafkaClient.make_request(
    FLC_TPC_PAYMENT,
    GET_ALL,
    filter,
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, data);
    });
});


/**
 * @swagger
 * /payment:
 *  post:
 *    description: Add value to balance
 *    tags:
 *      - payment
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: projectId
 *        description: the project Id
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: payment successful
 */
router.post('/', (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const projectId = req.body.projectId;

  if ( projectId === undefined ) handleRes.sendBadRequest(res, "Project ID not specified");

  kafkaClient.make_request(
    FLC_TPC_PAYMENT,
    POST,
    {projectId, payerId: user._id},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendOK(res, data);
    });
});

module.exports = router;