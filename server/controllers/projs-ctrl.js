const express = require('express');
const router = express.Router();
const projDao = require('../dao/projs-dao');
const projSkillDao = require('../dao/proj-skills-dao');
const projFilesDao = require('../dao/proj-files-dao');
const BidDao = require('../dao/bids-dao');
const {promiseGetResponse, promisePostResponse} = require('./ctrls');
const Project = require('../models/project');
const handleRes = require('./handle-ctrl');

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
router.get('/', (req, res) => {
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
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a project
 */
router.get('/:projectId', function (req, res, next) {
  const project_id = req.params.projectId;

  if (project_id !== undefined) {
    const projPromise = projDao.retrieve(Number(project_id));
    const skillPromise = projSkillDao.retrieve({project_id});
    const filesPromise = projFilesDao.retrieve({project_id});
    const bidsPromise = BidDao.countBids({project_id});
    const avgPricePromise = BidDao.avgBidPrice('bid_price', {project_id});

    Promise.all([projPromise, skillPromise, filesPromise, bidsPromise, avgPricePromise])
      .then(results => {
        const projs = results[0];
        const skills = results[1];
        const files = results[2];
        const cnts = results[3];
        const avgs = results[4];

        if ( projs.length < 1)
          res.status(404).send("Not Found");
        else{

          let skillSet = [];
          for ( let i = 0; i < skills.length; i++)
            skillSet.push(skills[i].skill_id);

          let fileSet = [];
          for ( let i = 0; i < files.length; i++ )
            fileSet.push(files[i].id);

          let proj = projs[0];
          res.set('X-Total-Count', proj.length);
          res.set('Access-Control-Expose-Headers', 'X-Total-Count');
          proj['skills'] = skillSet;
          proj['files'] = fileSet;
          proj['bids'] = cnts[0].cnt;
          proj['avg_price'] = avgs[0].avg_price;
          res.status(200).send(JSON.stringify(proj));
        }

    }).catch(err => {
      console.log(error);
      res.status(500).send(err);
    })

/*    skillPromise.then(skills => {

      let skillSet = [];
      for (let i = 0; i < skills.length; i++)
        skillSet.push(skills[i].skill_id);
      projPromise.then(projs => {
        if (projs.length < 1) {
          res.status(400).send("Not Found");
        } else {
          let proj = projs[0];
          res.set('X-Total-Count', proj.length);
          res.set('Access-Control-Expose-Headers', 'X-Total-Count');
          proj['skills'] = skillSet;
          res.status(200).send(JSON.stringify(proj));
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).send(err);

      }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
    });*/
  } else {
    res.status(400).send("Bad Request");
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
router.post('/', (req, res) => {
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

router.put('/:project_id', (req, res) => {
  console.log(req.params.project_id);
  const date =  new Date(req.body.start_date);
  req.body.start_date = date.toISOString().slice(0,10);
  delete req.body['skills'];
  delete req.body['files'];
  delete req.body['bids'];
  delete req.body['avg_price'];
  console.log(req.body);
  promisePostResponse(projDao.update(Number(req.params.project_id), req.body), req, res, 200);
});

module.exports = router;