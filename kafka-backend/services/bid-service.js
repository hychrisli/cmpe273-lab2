const Bid = require('../models/bid');
const Project = require('../models/project');
const handler = require('./handler');


exports.handleGetBids = (req, cb) =>{
  const filter = {
    userId: req.userId,
    isActive:req.isActive
  };
  Bid.find(JSON.parse(JSON.stringify(filter)),
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handleGetBid = (req, cb) =>{
  Bid.findOne({_id: req._id},
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handlePostBid = (req, cb) =>{
  const form = req.form;
  Project.findOne({_id: form.projectId}, (err, data) => {

    if (err) cb (err);
    else if (data === null) cb ( new Error("No Such Project"));
    else if ( form.userId === data.employerId ) cb ( new Error("Cannot bid on own project"));
    else {
      form.employerId = data.employerId;
      const bid = new Bid(form);
      bid.save((err) => {handler.genericCallback(err, JSON.parse(JSON.stringify(bid)), cb)})
    }
  });
};

exports.handleDelBid = (req, cb) =>{
  Bid.remove({_id: req._id, userId: req.userId, isActive: true},
    (err, data) => {handler.genericCallback(err, data, cb)} )
};