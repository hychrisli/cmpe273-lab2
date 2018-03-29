const express = require('express');
const router = express.Router();
const ProjectSkill = require('../models/project-skill');
const handleRes = require('./handle-res');


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
  const projectId = req.query.projectId;
  let filter = {};
  if (projectId !== undefined) {
    filter.projectId = projectId;
  }
  ProjectSkill.find(filter, (err, docs) => {
    if (err) handleRes.sendNotFound(res, err);
    else handleRes.sendArray(res, docs);
  })

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
router.post('/', (req, res) => {
  const projectId = req.body.projectId;
  const skillIds = req.body.skillId.split(',');
  if (skillIds === undefined || !Array.isArray(skillIds) || skillIds.length === 0)
    handleRes.sendBadRequest(res, "Invalid Skill Array");
  else {
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
    });
  }
});

module.exports = router;