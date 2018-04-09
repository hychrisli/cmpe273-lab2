const Skill = require('../models/skill');
const handler = require('./handler');

exports.handleGetSkills = (req, cb) => {

  Promise.all([
    Skill.count({}),
    Skill.find({}).skip(req.pagin.skip).limit(req.pagin.limit)
  ]).then(([cnt, skills]) => {
    const data = {cnt, skills};
    cb(null, data);
  }).catch(err => cb(err));
};


exports.handleGetSkill = (req, cb) => {
  Skill.findOne({_id: req._id},
    (err, data) => {
      handler.genericCallback(err, data, cb)
    });
};

exports.handlePostSkill = (req, cb) => {
  const skillName = req.skillName;
  Skill.findOne({skillName}, (err, data) => {
    if (err) cb(err);
    else if (data === null) {
      const skill = new Skill({skillName});
      skill.save(err => {
        if (err) cb(err);
        else Skill.findOne({skillName}, (err, data) => {
          handler.genericCallback(err, data, cb)
        })
      });
    } else handler.genericCallback(err, data, cb);
  });
};