const express = require('express');
const router = express.Router();
const {paginate} = require('./lib');
const handleRes = require('./handle-res');
const kafkaClient = require('../kafka-client/client');
const {
  GET_ALL,
  GET_ONE,
  POST,
  FLC_TPC_SKILL
} = require('../kafka-client/constants');

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
  kafkaClient.make_request(
    FLC_TPC_SKILL,
    GET_ALL,
    {pagin},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, data.skills, data.cnt);
    });
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
  if (skillId !== undefined && skillId !== "") {
    kafkaClient.make_request(
      FLC_TPC_SKILL,
      GET_ONE,
      {_id: skillId},
      (err, data) => {
        if (err) handleRes.sendNotFound(res, err);
        else handleRes.sendDoc(res, data);
      });
  }
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
  if (req.body.skillName === undefined) handleRes.sendBadRequest("Skill Name Needed");
  else {

    kafkaClient.make_request(
      FLC_TPC_SKILL,
      POST,
      {skillName: req.body.skillName},
      (err, data) => {
        if (err) handleRes.sendInternalSystemError(res, err);
        else handleRes.sendCreated(res, data);
      });
  }
});

module.exports = router;