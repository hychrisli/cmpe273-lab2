const ProjectSkill = require('../models/project-skill');
const Project = require('../models/project');
const Skill = require('../models/skill');
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

      Skill.find({_id: {$in: skIds}}, (err, data) => {
        if (err) cb(err);
        else if (data === null) cb("Invalid Skills");
        else {
          const projectSkills = [];

          for (let i = 0; i < skIds.length; i++) {
            projectSkills.push({
              projectId: req.projectId,
              skillId: data[i]._id,
              skillName: data[i].skillName
            });
          }
          ProjectSkill.collection.insert(projectSkills, {ordered: false}, (err, data) => {
            if (err && err.code !== 11000) cb(err);
            else cb(null, projectSkills);
          });
        }
      });
    }
  });
};