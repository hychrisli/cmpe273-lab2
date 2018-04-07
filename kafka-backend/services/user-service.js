const User = require('../models/user');

exports.handleGetUsers = (req, cb) => {
  User.find({}, (err, docs) => {
    if (err) cb(err);
    else cb(null, docs);
  });

};