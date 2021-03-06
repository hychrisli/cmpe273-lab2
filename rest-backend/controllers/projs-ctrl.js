const express = require('express');
const router = express.Router();
const projDao = require('../dao/projs-dao');
const projSkillDao = require('../dao/proj-skills-dao');
const BidDao = require('../dao/bids-dao');
const {promiseGetResponse, promisePostResponse} = require('./ctrls');
const Project = require('../models/project');
const ProjectSkill = require('../models/project-skill');
const handleRes = require('./handle-res');
const passport = require('passport');
require('../auth/passport')(passport);

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
 *    responses:
 *      200:
 *        description: projects
 */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const employerId = req.query.employerId;
  let filter = {};
  if (employerId !== undefined) filter.employerId = employerId;
  Project.find(filter, (err, docs) => {
    if (err) handleRes.sendInternalSystemError(res);
    else handleRes.sendArray(res, docs);
  })
  //promiseGetResponse(projDao.retrieveAll(filter), res, 200);
});


/**
 * @swagger
 * /projects/{projectId}:
 *  get:
 *    description: Retrieve Project Info
 *    tags:
 *       - projects
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
router.get('/:projectId', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  const projectId = req.params.projectId;

  if (projectId !== undefined) {
    // const filesPromise = projFilesDao.retrieve({project_id});
    // const bidsPromise = BidDao.countBids({project_id});
    // const avgPricePromise = BidDao.avgBidPrice('bid_price', {project_id});

    Promise.all([
      Project.findOne({_id: projectId}),
      ProjectSkill.find({projectId}),
      //filesPromise,
      //bidsPromise,
      //avgPricePromise
    ])
      .then(results => {
        let project = results[0];
        const skills = results[1];
        //const files = results[2];
        //const cnts = results[3];
        //const avgs = results[4];

        let skillSet = [];
        for (let i = 0; i < skills.length; i++)
          skillSet.push(skills[i].skillId);
        console.log(skillSet);
        /*          let fileSet = [];
                  for ( let i = 0; i < files.length; i++ )
                    fileSet.push(files[i].id);*/

        const projStr = JSON.stringify(project);
        let proj = JSON.parse(projStr);
        proj.skills = skillSet;

        /*proj['files'] = fileSet;
        proj['bids'] = cnts[0].cnt;
        proj['avg_price'] = avgs[0].avg_price;*/
        handleRes.sendDoc(res, proj);

      }).catch(err => {
      handleRes.sendNotFound(res, err);
    })

  } else {
    handleRes.sendBadRequest(res, "Invalid Project Id")
  }
});

/**
 * @swagger
 * /projects:
 *  post:
 *    description: Create a new project
 *    tags:
 *       - projects
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
 *      - name: employerId
 *        description: Employer's user ID
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
  req.body.startDate = new Date(req.body.startDate);
  const project = new Project(req.body);
  project.save((err) => {
    if (err) handleRes.sendInternalSystemError(res, err);
    else handleRes.sendCreated(res);
  });
});


/**
 * @swagger
 * /projects/{project_id}:
 *  put:
 *    description: update a project
 *    tags:
 *      - projects
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: number
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
 *      - name: minBudget
 *        description: minimum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: maxBudget
 *        description: maximum budget of the project
 *        in: formData
 *        required: false
 *        type: string
 *      - name: startDate
 *        description: The start date of the project
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:project_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const form = req.body;
  console.log(form);
  Project.update({_id: req.params.project_id}, {$set: form},
    (err, data) => {
    if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendOK(res)
    });
});

module.exports = router;