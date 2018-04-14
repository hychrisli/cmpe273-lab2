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
  FLC_TPC_USER_SKILL
} = require('../kafka-client/constants');


/**
 * @swagger
 * /user-skills:
 *  get:
 *    description: Retrieve skills of a user
 *    tags:
 *      - user-skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        in : query
 *        required: false
 *        type: string
 *        description: Retrieve skills per user
 *    responses:
 *      200:
 *        description: user skills
 */
router.get('/', (req, res) => {
  const userId = req.query.userId;
  kafkaClient.make_request(
    FLC_TPC_USER_SKILL,
    GET_ALL,
    {userId},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, data);
    });
});

/**
 * @swagger
 * /user-skills:
 *  post:
 *    description: Add a skill to a user
 *    tags:
 *      - user-skills
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: skillId
 *        description: skill id
 *        in: formData
 *        required: true
 *        type: array
 *        items:
 *          type: string
 *    responses:
 *      201:
 *        description: skill added to user
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  let skIds = req.body.skillId;
  if (Array.isArray(skIds))
    skIds = skIds.join();

  kafkaClient.make_request(
    FLC_TPC_USER_SKILL,
    POST,
    {
      skIdStr: skIds,
      userId: user._id
    },
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, data);
    });
});

module.exports = router;