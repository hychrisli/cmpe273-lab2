const mongoose = require('./db');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  employerId: {type: String, required: true},
  minBudget: {type: Number, required: true},
  maxBudget: {type: Number, required:true},
  startDate: {type: Date, required: true},
  status: String,
  chosenBid: String,
});

module.exports = mongoose.model('Project', ProjectSchema, 'Project');