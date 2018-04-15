const Project = require('../models/project');
const Bid = require('../models/bid');
const handler = require('./handler');


exports.handleGetProjects = (req, cb) =>{
  console.log(req);
  let filter = {
    employerId: req.employerId,
    status: req.status
  };
  filter = JSON.parse(JSON.stringify(filter));
  if ( req.title !== undefined ) filter.title = new RegExp(req.title, 'i');
  if ( req.skill !== undefined ) filter.skills = new RegExp(req.skill, 'i');

  Promise.all([
    Project.count({}),
    Project.find(filter).skip(req.pagin.skip).limit(req.pagin.limit)
  ])
    .then(([cnt, projs]) => {

      let projects = JSON.parse(JSON.stringify(projs));
      for ( let i =0; i < projects.length; i++){
        projects[i].range = projects[i].minBudget + '~' + projects[i].maxBudget
      }

      const data = {cnt, projects};
      cb(null, data);
    })
    .catch( err => {
      console.log(err);
      cb(err);
    });
};

exports.handleGetProject = (req, cb) =>{
  const projectId = req.projectId;

  Promise.all([
    Project.findOne({_id: projectId}),
    Bid.aggregate([{$match: {projectId}}, {$group: {_id: null, avgPrice: { $avg: "$bidPrice"}}}])
  ])
    .then( ([project, avgAgg] ) => {

      if ( project === null ) cb('Not Found');
      else {

        project = JSON.parse(JSON.stringify(project));
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