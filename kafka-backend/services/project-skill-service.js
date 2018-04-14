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
  Promise.all([
    Project.findOne({_id: req.projectId, employerId: req.userId}),
    ProjectSkill.find({projectId: req.projectId})
  ])
    .then(([project, projectSkills]) => {
      if (project === null) cb("Invalid Project");
      else {

        console.log(projectSkills);

        // Gather current skills
        const skillNameSet = new Set();
        for ( let i = 0; i < projectSkills.length; i++) {
          skillNameSet.add(projectSkills[i].skillName)
        }

        const skIds = req.skIdStr.split(',');

        // look for skills
        Skill.find({_id: {$in: skIds}}, (err, data) => {
          if (err) cb(err);
          else if (data === null) cb("Invalid Skills");
          else {
            const projectSkills = [];
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              if ( !skillNameSet.has(data[i].skillName) ) {
                projectSkills.push({
                  projectId: req.projectId,
                  skillId: data[i]._id,
                  skillName: data[i].skillName
                });
                skillNameSet.add(data[i].skillName);
              }
            }

            const skillNames = Array.from(skillNameSet);

            // insert and update
            ProjectSkill.collection.insert(projectSkills, {ordered: false}, (err) => {
              if (err && err.code !== 11000) cb(err);
              else {
                Project.update({_id: req.projectId}, {$set: {skills: skillNames.join(', ')}},
                  (err) => {
                    if (err) cb(err);
                    else cb(null, projectSkills)
                  })
                }
              });
              }
            });
          }
    })
    .catch(err => {
      if (err) cb(err);
    });
};