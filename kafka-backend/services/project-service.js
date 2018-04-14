const Project = require('../models/project');
const ProjectSkill = require('../models/project-skill');
const Bid = require('../models/bid');
const handler = require('./handler');


exports.handleGetProjects = (req, cb) =>{
  console.log(req);
  const filter = {
    employerId: req.employerId,
    status: req.status
  };
  Project.find(JSON.parse(JSON.stringify(filter)),
    (err, data) => {handler.genericCallback(err, data, cb)})
};

exports.handleGetProject = (req, cb) =>{
  const projectId = req.projectId;

  Promise.all([
    Project.findOne({_id: projectId}),
    ProjectSkill.find({projectId}, {_id: 0, skillName: 1}),
    Bid.count({projectId}),
    Bid.aggregate([{$match: {projectId}}, {$group: {_id: null, avgPrice: { $avg: "$bidPrice"}}}])
  ])
    .then( ([project, skills, count, avgAgg] ) => {

      if ( project === null ) cb('Not Found');
      else {
        let skNames = [];
        for (let i = 0; i < skills.length; i++)
          skNames.push(skills[i].skillName);

        project = JSON.parse(JSON.stringify(project));
        project.skills = skNames.join(', ');
        project.bids = count;
        project.avgPrice = avgAgg.length === 1 ? avgAgg[0].avgPrice : 0;
        cb(null, project);
      }
  })
    .catch (err => cb(err))

};

exports.handlePostProject = (req, cb) =>{
  req.form.startDate = new Date(req.form.startDate);
  const project = new Project(req.form);
  project.save((err) => {handler.genericCallback(err, JSON.parse(JSON.stringify(project)), cb)});
};

exports.handlePutProject = (req, cb) =>{
  const form = req.form;
  console.log(form);
  Project.update({_id: req._id, employerId: req.employerId}, {$set: form},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handleDelProject = (req, cb) =>{
  Project.remove({_id: req._id, employerId: req.employerId},
    (err, data) => {handler.genericCallback(err, data, cb)} )
};