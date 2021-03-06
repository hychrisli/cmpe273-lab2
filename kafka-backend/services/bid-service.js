const Bid = require('../models/bid');
const Project = require('../models/project');
const User = require('../models/user');
const handler = require('./handler');


exports.handleGetBids = (req, cb) =>{
  console.log(req);
  const filter = {
    userId: req.userId,
    projectId: req.projectId,
    isActive:req.isActive
  };
  Bid.find(JSON.parse(JSON.stringify(filter)),
    (err, data) => {handler.genericCallback(err, data, cb)});
};

exports.handleGetBid = (req, cb) =>{
  Bid.findOne({_id: req._id},
    (err, bid) => {
      if (err) cb(err);
      else if (bid === null) cb(null, bid);
      else {
        User.findOne({_id: bid.userId}, (err, user) => {
          if (err) cb(err);
          else if (user === null) cb(null, bid);
          else {
            let data = JSON.parse(JSON.stringify(bid));
            data.username = user.username;
            cb(null, data)
          }
        })
      }
    });
};

exports.handlePostBid = (req, cb) =>{
  const form = req.form;
  console.log(form);
  Promise.all([
    Project.findOne({_id: form.projectId}),
    Bid.findOne({projectId: form.projectId, userId: form.userId})
  ]).then(([project, preBid]) => {
    if (project === null) cb("No Such Project");
    else if (form.userId === project.employerId) cb ("Cannot bid on own project");
    else if (preBid !== null) cb("Already bid on this project");
    else {
      form.employerId = project.employerId;
      const bid = new Bid(form);
      Promise.all([
        bid.save(),
        Project.update({_id: form.projectId}, {$inc: {bidNum: 1}}),
      ]).then(()=>{
        cb(null, JSON.parse(JSON.stringify(bid)));
      })
        .catch(err => {
          console.log(err);
          cb(err);
        });
    }
  }).catch( err => {
    console.log(err);
    cb(err);
  });
};

exports.handleDelBid = (req, cb) =>{

  Bid.findOne({_id: req._id, userId: req.userId, isActive: true},
    (err, data) => {
      if (err) cb(err);
      else if (data === null) cb('Invalid Bid');
      else {
        Promise.all([
          Bid.remove({_id: req._id}),
          Project.update({_id: data.projectId}, {$inc: {bidNum: -1}})
        ])
          .then( ([rmFb, updFb]) => {
            cb(null, rmFb);
          })
          .catch( err => {
            console.log(err);
            cb(err);
          });
      }
    });
};