const UserSkill = require('../models/user-skill');
const ProjectSkill = require('../models/project-skill');

exports.handleGetMatchedProjects = (req, cb) => {
  /*
  * req: { userId }
  */

  UserSkill.find({userId: req.userId}, {_id: 0, skillId: 1}, (err, data) => {
    if (err) cb(err);
    else if (data === null) cb(null, []);
    else {
      const skIds = [];
      for (let i = 0; i < data.length; i++) {
        skIds.push(data[i].skillId);
      }

      ProjectSkill
        .aggregate([
          {$match: {skillId: {$in: skIds}}},
          {$group: {_id: "$projectId", count: {$sum: 1}, skills: {$push: "$skillName"}}}
          ],
          (err, data) => {
            if (err) cb(err);
            if (data == null) cb(null, []);
            else {
              const projects = {};
              for (let i = 0; i < data.length; i++) {
                if (data[i].count >= 1) {
                  projects[data[i]._id] = data[i].skills.join(',');
                }
              }


              const matchedProjects = [];
              for ( const key in projects ) {
                matchedProjects.push(
                  {
                    _id: key,
                    skills: projects[key]
                  }
                )
              }

              cb(null, matchedProjects);
            }
          })
    }
  });

};
