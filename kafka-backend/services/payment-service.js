const Payment = require('../models/payment');
const Project = require('../models/project');
const Bid = require('../models/bid');
const Balance = require('../models/balance');
const handler = require('./handler');

exports.handleGetPayments = (req, cb) => {
  // req: {payerId, payeeId}
  console.log(req);
  let filter = {};
  filter.payerId = req.payerId;
  filter.payeeId = req.payeeId;
  console.log(JSON.parse(JSON.stringify(filter)));
  Payment.find(JSON.parse(JSON.stringify(filter)), (err, data) => handler.genericCallback(err, data, cb))
};

exports.handleMakePayment = (req, cb) => {
  // req: {projectId, payerId}
  Project.findOne({_id: req.projectId, employerId: req.payerId},
    (err, project) => {
      if (err) cb(err);
      else if (project === null) cb('Not Valid Project');
      else if (project.status !== 1) cb('No Bid chosen yet');
      else {
        Promise.all([
          Bid.findOne({_id: project.chosenBid}),
          Balance.findOne({userId: req.payerId})
        ])
          .then(([bid, payerBal]) => {
            if (bid === null) cb('Not Valid Bid');
            else if ( payerBal.total < bid.bidPrice ) cb("Insufficient Fund");
            else {
              const payment = new Payment({
                payerId: req.payerId,
                payeeId: bid.userId,
                bidId: bid._id,
                projectId: req.projectId,
                amount: bid.bidPrice,
                time: new Date()
              });
              console.log(payment);
              Promise.all([
                payment.save(),
                Balance.update({userId: payment.payerId}, {$inc: {total: -payment.amount, expense: payment.amount}}),
                Balance.update({userId: payment.payeeId}, {$inc: {total: payment.amount, income: payment.amount}}),
                Project.update({_id: payment.projectId}, {$set: {status: 2}})
              ])
                .then(data => cb(null, data))
                .catch(err => cb(err));
            }
          })
          .catch( err => cb(err));
      }
    })
};

