const mongoose = require('./db');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  payerId: {type: String, required: true},
  payeeId: {type: String, required: true},
  bidId: {type: String, required: true},
  projectId: {type: String, required: true},
  amount: {type: Number, required: true},
  time: {type: Date, required: true},
});

module.exports = mongoose.model('Payment', PaymentSchema, 'Payment');