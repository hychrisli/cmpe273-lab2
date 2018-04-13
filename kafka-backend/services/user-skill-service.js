const UserSkill = require('../models/user-skill');
const Skill = require('../models/skill');
const handler = require('./handler');

exports.handleGetUserSkills = (req, cb) => {
  UserSkill.find({userId: req.userId}, (err, data) => {handler.genericCallback(err, data, cb)});

};

exports.handlePostUserSkills = (req, cb) => {

  const skIds = req.skIdStr.split(',');

  Skill.find({_id: {$in: skIds}}, (err, data) => {
    if (err) cb(err);
    else if (data === null) cb("Invalid Skills");
    else {
      const userSkills = [];
      for (let i = 0; i < data.length; i++) {
        userSkills.push({
          userId: req.userId,
          skillId: data[i]._id,
          skillName: data[i].skillName
        });
      }
      UserSkill.collection.insert(userSkills, {ordered: false}, (err) => {
        if (err && err.code !== 11000) cb(err);
        else cb(null, userSkills);
      });
    }
  });
};