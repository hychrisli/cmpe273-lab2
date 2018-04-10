const User = require('../models/user');
const Session = require('../models/session');
const handler = require('./handler');

exports.handleGetSession = (req, cb) => {
  Session.findOne({username: req.username},
    (err, data) => {handler.genericCallback(err, data, cb)});
};


exports.handleDeleteSession = (req, cb) => {
  Session.remove({username: req.username},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handlePostSession = (req, cb) => {
  User.findOne( {username: req.username}, (err, data) => {
    let now = new Date();
    now.setHours(now.getHours() + 1);

    if (err) cb(err);
    else if ( data === null ) {
      const session = new Session({
        username: req.username,
        jwt: req.jwt,
        expire: now
      });
      session.save((err, data) => {handler.genericCallback(err, data, cb)});
    }
    else {
      Session.update({username}, {$set: {jwt: req.jwt, expire: now}}, (err) => {if (err) cb(err)})
    }
  });

};