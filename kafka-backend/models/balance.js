const mongoose = require('./db');
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
  userId: {type: String, unique: true, required: true},
  total: {type: Number, default: 0.0},
  income: {type: Number, default: 0.0},
  expense: {type: Number, default: 0.0},
});

module.exports = mongoose.model('Balance', BalanceSchema, 'Balance');