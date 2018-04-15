const mongoose = require('./db');
const Schema = mongoose.Schema;

const ProjectFileSchema = new Schema({
  projectId: {type: String, required: true},
  userId: {type: String, required: true},
  fileName: {type: String, required: true},
  filePath: {type: String, required: true},
});

module.exports = mongoose.model('ProjectFile', ProjectFileSchema, 'ProjectFile');