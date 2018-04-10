const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');
const {key} = require('../auth/constants');
const kafkaClient = require('../kafka-client/client');
const jwt = require('jsonwebtoken');
const {
  GET_ONE,
  POST,
  DELETE,
  FLC_TPC_SESSION
} = require('../kafka-client/constants');

/**
 * @swagger
 * /session:
 *  get:
 *    description: get my session information
 *    security:
 *      - bearer: []
 *    tags:
 *       - session
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: my session
 */
router.get('/', (req, res) => {

  let token = req.header('Authorization');
  if ( token === undefined ) handleRes.sendNotFound(res);
  else {
    token = token.substring(7, token.length);
    const user = jwt.decode(token, key);
    console.log(user);
    kafkaClient.make_request(
      FLC_TPC_SESSION,
      GET_ONE,
      {username: user.user.username},
      (err, data) => {
        if (err) handleRes.sendNotFound(res, err);
        else if ( data.jwt !== token ) handleRes.sendNotFound(res, "Stale Token");
        else if ( new Date() > data.expire ) handleRes.sendNotFound(res, "Session Expired");
        else handleRes.sendOK(res);
      }
    )
  }
});


/**
 * @swagger
 * /session:
 *  delete:
 *    description: delete user's session
 *    security:
 *      - bearer: []
 *    tags:
 *       - session
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: deleted
 */
router.delete('/', function (req, res) {
  let token = req.header('Authorization');
  console.log(token);
  if ( token === undefined ) handleRes.sendNotFound(res);
  else {
    token = token.substring(7, token.length);
    const user = jwt.decode(token, key);
    console.log(user);
    kafkaClient.make_request(
      FLC_TPC_SESSION,
      DELETE,
      {username: user.user.username},
      (err) => {
        if (err) handleRes.sendNotFound(res, err);
        else handleRes.sendOK(res);
      }
    )
  }
});


module.exports = router;