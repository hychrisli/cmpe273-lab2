const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');
const {jwtDecode} = require('./lib');
const passport = require('passport');
require('../auth/passport')(passport);

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_MATCH,
  GET_ALL,
} = require('../kafka-client/constants');


/**
 * @swagger
 * /match:
 *  get:
 *    description: update a project
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: match projects found
 */

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwtDecode(req.header('Authorization'));

    kafkaClient.make_request(
      FLC_TPC_MATCH,
      GET_ALL,
      {userId: user._id},
      (err, data) => {
        if (err) handleRes.sendInternalSystemError(res, err);
        else handleRes.sendArray(res, data);
      });
  }
);

module.exports = router;