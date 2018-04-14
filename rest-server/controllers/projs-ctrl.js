const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');
const passport = require('passport');
require('../auth/passport')(passport);
const {jwtDecode, paginate} = require('./lib');

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_PROJECT,
  GET_ALL,
  GET_ONE,
  DELETE,
  POST,
  PUT
} = require('../kafka-client/constants');


/**
 * @swagger
 * /projects:
 *  get:
 *    description: Retrieve all projects
 *    tags:
 *       - projects
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: employerId
 *        in : query
 *        required: false
 *        type: string
 *        description: retrieve projects as employer
 *      - name: status
 *        in : query
 *        required: false
 *        type: number
 *        description: retrieve active projects
 *      - name: title
 *        in : query
 *        required: false
 *        type: string
 *        description: search title
 *      - name: skill
 *        in : query
 *        required: false
 *        type: string
 *        description: search skill
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
 *    responses:
 *      200:
 *        description: projects
 */
router.get('/', (req, res) => {
  const status = req.query.status === undefined ? 0: req.query.status;
  const pagin = paginate(req);
  kafkaClient.make_request(
    FLC_TPC_PROJECT,
    GET_ALL,
    {
      employerId: req.query.employerId,
      status,
      pagin,
      title: req.query.title,
      skill: req.query.skill
    },
    (err, docs) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, docs);
    });
});


/**
 * @swagger
 * /projects/{projectId}:
 *  get:
 *    description: Retrieve Project Info
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: projectId
 *        description: project ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: a project
 */
router.get('/:projectId', passport.authenticate('jwt', {session: false}), function (req, res) {

  kafkaClient.make_request(
    FLC_TPC_PROJECT,
    GET_ONE,
    {
      projectId: req.params.projectId,
    },
    (err, docs) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, docs);
    });
});

/**
 * @swagger
 * /projects:
 *  post:
 *    description: Create a new project
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: title
 *        description: Title of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: Description of the project
 *        in: formData
 *        required: true
 *        type: string
 *      - name: minBudget
 *        description: minimum budget of the project
 *        in: formData
 *        required: true
 *        type: number
 *      - name: maxBudget
 *        description: maximum budget of the project
 *        in: formData
 *        required: true
 *        type: number
 *      - name: startDate
 *        description: The start date of the project
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: project created
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const form = req.body;
  form.employerId = user._id;

  kafkaClient.make_request(
    FLC_TPC_PROJECT,
    POST,
    {form},
    (err, data) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendDoc(res, data);
    });
});


/**
 * @swagger
 * /projects/{project_id}:
 *  put:
 *    description: update a project
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: string
 *      - name: title
 *        description: Title of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: description
 *        description: Description of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: min_budget
 *        description: minimum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: max_budget
 *        description: maximum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: start_date
 *        description: The start date of the project
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:project_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const projectId = req.params.project_id;
  kafkaClient.make_request(
    FLC_TPC_PROJECT,
    PUT,
    {_id: projectId, employerId: user._id, form: req.body},
    (err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendOK(res);
    });
});


/**
 * @swagger
 * /projects/{project_id}:
 *  delete:
 *    description: update a project
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: project updated
 */

router.delete('/:project_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = jwtDecode(req.header('Authorization'));
  const projectId = req.params.project_id;
  kafkaClient.make_request(
    FLC_TPC_PROJECT,
    DELETE,
    {_id: projectId, employerId: user._id},
    (err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendOK(res);
    });
});


module.exports = router;