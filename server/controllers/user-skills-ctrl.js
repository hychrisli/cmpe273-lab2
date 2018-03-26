const express = require('express');
const router = express.Router();
const userSkillDao = require('../dao/user-skills-dao');
const {promiseGetResponse, promisePostResponse} = require('./ctrls');

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
 *      - name: user_id
 *        in : query
 *        required: false
 *        type: string
 *        description: Retrieve skills per user
 *    responses:
 *      200:
 *        description: user skills
 */
router.get('/', (req, res) => {
  const user_id = req.query.user_id;
  let filter = {};
  if (user_id !== undefined) {
    filter['user_id'] = user_id;
  }
  promiseGetResponse(userSkillDao.retrieve(filter), res, 200);
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
 *      - name: username
 *        description: username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: skill_id
 *        description: skill id
 *        in: formData
 *        required: true
 *        type: array[number]
 *    responses:
 *      201:
 *        description: skill added to user
 */
router.post('/', (req, res) => {
  console.log(req.body);
  promisePostResponse(userSkillDao.insert(req.body, 'skill_id'), req, res, 201);
});

module.exports = router;