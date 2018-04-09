const mongoose = require('./db');
const Schema = mongoose.Schema;

const BidSchema = new Schema({
  userId: {type: String, required: true},
  projectId: {type: String, required: true},
  employerId: {type: String, required: true},
  bidPrice: {type: Number, required: true},
  bidDays: {type: Number, required: true},
  isActive: {type: Boolean, default: true}
});

BidSchema.index({userId: 1, projectId: 1}, {unique: true});

module.exports = mongoose.model('Bid', BidSchema, 'Bid');