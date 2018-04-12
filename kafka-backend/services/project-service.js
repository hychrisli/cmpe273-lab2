const Project = require('../models/project');
const handler = require('./handler');


exports.handleGetProjects = (req, cb) =>{
  const filter = {
    employerId: req.employerId
  };
  Project.find(JSON.parse(JSON.stringify(filter)),
    (err, data) => {handler.genericCallback(err, data, cb)})
};

exports.handleGetProject = (req, cb) =>{
};

exports.handlePostProject = (req, cb) =>{
  console.log(req);
  req.form.startDate = new Date(req.form.startDate);
  const project = new Project(req.form);
  console.log(req.form);
  console.log(project);
  project.save((err) => {handler.genericCallback(err, JSON.parse(JSON.stringify(project)), cb)});
};

exports.handlePutProject = (req, cb) =>{
  const form = req.form;
  console.log(form);
  Project.update({_id: req._id}, {$set: form},
    (err, data) => {handler.genericCallback(err, data, cb)});
};