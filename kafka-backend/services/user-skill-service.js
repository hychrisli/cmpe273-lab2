const UserSkill = require('../models/user-skill');
const handler = require('./handler');

exports.handleGetUserSkills = (req, cb) => {
  UserSkill.find({userId: req.userId}, (err, data) => {handler.genericCallback(err, data, cb)});

};

exports.handlePostUserSkills = (req, cb) => {
  UserSkill.collection.insert(req.userSkills, {ordered: false}, (err) => {
    if (err && err.code !== 11000) cb(err);
    else cb(null);
  });
};