const Project = require('../models/project');
const Bid = require('../models/bid');
const handler = require('./handler');


exports.handleHire = (req, cb) =>{

  console.log(req);
  Promise.all([
    Project.findOne({_id: req.projectId, employerId: req.employerId}),
    Bid.findOne({_id: req.chosenBid}),
  ])
    .then (([project, bid]) => {
      console.log(project, bid);
      if ( project === null) cb('Invalid Project');
      else if ( bid === null ) cb(new Error('Invalid BId'));
      else {
        Promise.all([
          Project.update({_id: req.projectId}, {$set: {status: 1, chosenBid: bid._id}}),
          Bid.update({projectId: req.projectId}, {$set: {isActive: false}})
        ])
          .then( data => {
            cb(null, data);
          })
          .catch(err=>{
            console.log(err);
            cb(err);
          });
      }
  }).catch(err => {
    console.log(err);
    cb(err)
  });
};
