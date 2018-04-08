const User = require('../models/user');
const handler = require('./handler');

exports.handleGetUsers = (req, cb) => {
  User.find({},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handleGetUserById = (req, cb) => {
  User.findOne({_id: req._id},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handlePostUser = (req, cb) => {
  const user = new User({
    username: req.username,
    password: req.password,
    email: req.email
  });
  user.save((err, data) => {handler.genericCallback(err, data, cb)});
};