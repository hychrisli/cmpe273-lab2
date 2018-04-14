const User = require('../models/user');
const handler = require('./handler');

exports.handleGetUsers = (req, cb) => {
  User.find({},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handleGetUser = (filter, cb) => {
  console.log(filter);
  User.findOne(filter,
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handlePostUser = (req, cb) => {
  User.findOne( {username: req.username}, (err, user) => {
    if (err) cb(err);
    else if ( user === null ) {
      const user = new User({
        username: req.username,
        password: req.password,
        email: req.email
      });
      user.save((err, data) => {handler.genericCallback(err, data, cb)});
    } else handler.genericCallback(err, user, cb);
  });

};

exports.handleUpdUser = (req, cb) => {
  const username = req.username;
  const form = req.form;

  console.log(username);
  console.log(form);

  User.update({username}, {$set: form}, (err) => {
    if (err) console.log(err);
    else {
      User.findOne({username}, (err, user) => {handler.genericCallback(err, user, cb)});
    }
  });
};