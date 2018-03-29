const express = require('express');
const router = express.Router();
const UserSkill = require('../models/user-skill');
const handleRes = require('./handle-res');

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
  let filter = {};
  if (userId !== undefined) {
    filter.userId = userId;
  }

  UserSkill.find(filter, (err, docs) => {
    if (err) handleRes.sendNotFound(res, err);
    else handleRes.sendArray(res, docs)
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
router.post('/', (req, res, next) => {
  const userId = req.body.userId;
  const skillIds = req.body.skillId.split(',');
  if (skillIds === undefined || !Array.isArray(skillIds) || skillIds.length === 0)
    handleRes.sendBadRequest(res, "Invalid Skill Array");
  else {
    userSkills = [];
    for (let i = 0; i < skillIds.length; i++) {
      userSkills.push({
        userId,
        skillId: skillIds[i]
      });
    }
    UserSkill.collection.insert(userSkills, {ordered: false}, (err) => {
      if (err && err.code !== 11000) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendCreated(res);
    });
  }
});

module.exports = router;