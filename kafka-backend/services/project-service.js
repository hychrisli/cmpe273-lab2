const Project = require('../models/project');
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