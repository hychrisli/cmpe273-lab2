const ProjectSkill = require('../models/project-skill');
const Project = require('../models/project');
const handler = require('./handler');

exports.handleGetProjectSkills = (req, cb) =>{
  console.log('here', req);
  const filter = {
    projectId: req.projectId,
  };
  ProjectSkill.find(JSON.parse(JSON.stringify(filter)),
    (err, data) => {handler.genericCallback(err, data, cb)})
};

exports.handlePostProjectSkills = (req, cb) =>{

  console.log(req);

  Project.findOne({_id: req.projectId, employerId: req.userId}, (err, data) => {
    if (err) cb (err);
    else if ( data === null ) cb("Invalid Project");
    else {
      const skIds = req.skIdStr.split(',');
      const projectSkills = [];

      for (let i = 0; i < skIds.length; i++) {
        projectSkills.push({
          projectId: req.projectId,
          skillId: skIds[i]
        });
      }
      ProjectSkill.collection.insert(projectSkills, {ordered: false}, (err, data) => {
        if (err && err.code !== 11000) cb(err);
        else cb(data);
      });
    }
  });
};