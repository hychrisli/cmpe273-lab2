const Balance = require('../models/balance');
const handler = require('./handler');

exports.handleGetBalance = (req, cb) => {
  // req: {userId}
  Balance.findOne({userId: req.userId}, (err, data)=>{
    handler.genericCallback(err, data, cb);
  });
};


exports.handleAddBalance = (req, cb) => {
  // req: {userId, amount}
  if (req.amount <= 0 ) cb('Cannot add negative number');
  else if ( req.amount > 10000 ) cb ('Too much money');

  Balance.update({userId: req.userId}, {$inc: {total: req.amount}}, (err, data) => {
    handler.genericCallback(err, data, cb);
  })
};

