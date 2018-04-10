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
  //console.log(token);
  if ( token === undefined ) handleRes.sendNotFound(res);
  else {
    token = token.substring(7, token.length);
    const user = jwt.decode(token, key);
    console.log(user);
  }

/*  kafkaClient.make_request(
    FLC_TPC_SKILL,
    GET_ALL,
    {pagin},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, data.skills, data.cnt);
    });*/
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
  }
});


module.exports = router;