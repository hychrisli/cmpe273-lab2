const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');

const passport = require('passport');
require('../auth/passport')(passport);
const {jwtDecode} = require('./lib');

const kafkaClient = require('../kafka-client/client');
const {
  GET_ONE,
  PUT,
  FLC_TPC_BALANCE
} = require('../kafka-client/constants');

/**
 * @swagger
 * /balance:
 *  get:
 *    description: Retrieve my balance
 *    tags:
 *      - payment
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: projects
 */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));

  kafkaClient.make_request(
    FLC_TPC_BALANCE,
    GET_ONE,
    {userId: user._id},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendDoc(res, data);
    });
});


/**
 * @swagger
 * /balance:
 *  put:
 *    description: Add value to balance
 *    tags:
 *      - payment
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: amount
 *        description: Add money amount
 *        in: formData
 *        required: true
 *        type: number
 *    responses:
 *      201:
 *        description: skill created
 */
router.put('/', (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const amount = req.body.amount;

  if ( amount === undefined ) handleRes.sendBadRequest(res, "Not money amount specified");
  if ( amount < 0 ) handleRes.sendBadRequest(res, "Cannot add negative amount");

  kafkaClient.make_request(
    FLC_TPC_BALANCE,
    PUT,
    {userId: user._id, amount},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else if ( data.n === 0 ) handleRes.sendInternalSystemError(res, "Unsuccessful");
      else handleRes.sendOK(res);
    });
});

module.exports = router;