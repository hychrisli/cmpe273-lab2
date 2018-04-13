const express = require('express');
const router = express.Router();
const ProjectSkill = require('../models/project-skill');
const handleRes = require('./handle-res');
const passport = require('passport');
require('../auth/passport')(passport);
const {jwtDecode} = require('./lib');

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_PROJECT_SKILL,
  GET_ALL,
  POST,
} = require('../kafka-client/constants');

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
 *      - name: projectId
 *        in : query
 *        required: false
 *        type: string
 *        description: Retrieve skills per project
 *    responses:
 *      200:
 *        description: project skills
 */
router.get('/', (req, res) => {

  kafkaClient.make_request(
    FLC_TPC_PROJECT_SKILL,
    GET_ALL,
    {projectId: req.query.projectId,},
    (err, docs) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, docs);
    });
});

/**
 * @swagger
 * /proj-skills:
 *  post:
 *    description: Add a skill to project
 *    tags:
 *      - proj-skills
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: projectId
 *        description: project id
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
 *        description: skill added to project
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const projectId = req.body.projectId;
  let skIds = req.body.skillId;
  if (Array.isArray(skIds))
    skIds = skIds.join();

  kafkaClient.make_request(
    FLC_TPC_PROJECT_SKILL,
    POST,
    {
      projectId,
      skIdStr: skIds,
      userId: user._id
    },
    (err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendOK(res);
    });

/*
  projectSkills = [];
  for (let i = 0; i < skillIds.length; i++) {
    projectSkills.push({
      projectId,
      skillId: skillIds[i]
    });
  }
  ProjectSkill.collection.insert(projectSkills, {ordered: false}, (err) => {
    if (err && err.code !== 11000) handleRes.sendInternalSystemError(res, err);
    else handleRes.sendCreated(res);
  });*/
});

module.exports = router;