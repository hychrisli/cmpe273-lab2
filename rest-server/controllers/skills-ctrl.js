const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');
const {paginate} = require('./lib');
const handleRes = require('./handle-res');
/**
 * @swagger
 * /skills:
 *  get:
 *    description: Retrieve all skills
 *    tags:
 *       - skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: _start
 *        in : query
 *        required: false
 *        type: number
 *        description: pagination start
 *      - name: _end
 *        in: query
 *        required: false
 *        type: number
 *        description: pagination end
 *      - name: id
 *        in: query
 *        required: false
 *        type: array[number]
 *        description: refer to skill set
 *    responses:
 *      200:
 *        description: projects
 */
router.get('/', (req, res) => {
  const pagin = paginate(req);
  Promise.all([
    Skill.count({}),
    Skill.find({}).skip(pagin.skip).limit(pagin.limit)
  ]).then( ([cnt, skills]) => {
    handleRes.sendArray(res, skills, cnt);
  }).catch(err => handleRes.sendInternalSystemError(res, err))
});


/**
 * @swagger
 * /skills/{skillId}:
 *  get:
 *    description: Retrieve skill info
 *    tags:
 *       - skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: skillId
 *        description: skill ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: a project
 */
router.get('/:skillId', function (req, res) {
  const skillId = req.params.skillId;
  if ( skillId !== undefined && skillId !== "")
    Skill.findOne({_id: skillId}, (err, doc) => {
      if (err) handleRes.sendNotFound(res, err);
      else handleRes.sendDoc(res, doc);
    });
  else
    handleRes.sendBadRequest(res, "Empty skill Id")
});

/**
 * @swagger
 * /skills:
 *  post:
 *    description: Create a skill
 *    tags:
 *       - skills
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: skillName
 *        description: The Name of the skill
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: skill created
 */
router.post('/', (req, res) => {
  if ( req.body.skillName === undefined) handleRes.sendBadRequest("Skill Name Needed");
  else {
    const skill = new Skill({
      skillName: req.body.skillName
    });
    skill.save((err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendCreated(res);
    })
  }
});

module.exports = router;