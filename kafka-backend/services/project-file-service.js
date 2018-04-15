const ProjectFile = require('../models/project-file');
const handler = require('./handler');

exports.handleGetProjectFiles = (req, cb) =>{
  // req: {projectId}
  ProjectFile.find(JSON.parse(JSON.stringify(req)), (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handleGetProjectFile = (req, cb) =>{
  // req: {fileId}
  ProjectFile.findOne({_id: req.fileId}, (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handlePostProjectFile = (req, cb) =>{
  // req: {userId, projectId, fileName, filePath}
  const projectFile = new ProjectFile(req);
  projectFile.save((err, data) => {handler.genericCallback(err, data, cb)})
};

exports.handleDeleteProjectFile = (req, cb) => {
  // req: {userId, fileId}
  ProjectFile.findOne({_id: req.fileId, userId: req.userId},
    (err, file) => {
      if (err) cb(err);
      else if ( file === null ) cb(null, file);
      else {
        ProjectFile.remove({_id: req.fileId}, (err) => {handler.genericCallback(err, file, cb)});
      }
    });

};