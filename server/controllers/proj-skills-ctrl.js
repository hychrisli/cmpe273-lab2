const express = require('express');
const router = express.Router();
const projSkillDao = require('../dao/proj-skills-dao');
const {promiseGetResponse, promisePostResponse, promiseGetOneResponse} = require('./ctrls');

/**
 * @swagger
 * /proj-skills:
 *  get:
 *    description: Retrieve skills required by a project
 *    tags:
 *      - proj-skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        in : query
 *        required: false
 *        type: string
 *        description: Retrieve skills per project
 *    responses:
 *      200:
 *        description: project skills
 */
router.get('/', (req, res) => {
  const project_id = req.query.project_id;
  let filter = {};
  if (project_id !== undefined) {
    filter['project_id'] = project_id;
  }
  promiseGetResponse(projSkillDao.retrieve(filter), res, 200);
});

/**
 * @swagger
 * /proj-skills:
 *  post:
 *    description: Add a skill to project
 *    tags:
 *      - proj-skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project id
 *        in: formData
 *        required: true
 *        type: string
 *      - name: skill_id
 *        description: skill id
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: skill added to project
 */
router.post('/', (req, res) => {
  console.log(req.body);
  promisePostResponse(projSkillDao.insert(req.body, 'skill_id'), req, res, 201);
});

module.exports = router;