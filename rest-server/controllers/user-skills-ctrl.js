const express = require('express');
const router = express.Router();
// const UserSkill = require('../models/user-skill');
const handleRes = require('./handle-res');
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
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: username
 *        in: formData
 *        required: true
 *        type: string
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
router.post('/', (req, res) => {
  const userId = req.body.userId;
  let skillIds = req.body.skillId;
  if (!Array.isArray(skillIds))
    skillIds = skillIds.split(',');

  const userSkills = [];
  for (let i = 0; i < skillIds.length; i++) {
    userSkills.push({
      userId,
      skillId: skillIds[i]
    });
  }

  kafkaClient.make_request(
    FLC_TPC_USER_SKILL,
    POST,
    {userSkills},
    (err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendCreated(res);
    });
});

module.exports = router;