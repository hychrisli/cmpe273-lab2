const User = require('../models/user');
const Image = require('../models/image');
const handler = require('./handler');

exports.handleGetImage = (req, cb) => {
  Image.findOne({username: req.username},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handlePostImage = (req, cb) => {
  User.findOne({username: req.username}, (err, user) => {
    if (err) cb(err);
    else {
      const image = new Image({
        userId: user._id,
        username: user.username,
        base64Img: req.base64Img
      });
      image.save((err, data) => {handler.genericCallback(err, data, cb)});
    }
  })
};