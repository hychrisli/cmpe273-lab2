const mongoose = require('./db');
const Schema = mongoose.Schema;

const ProjectSkillSchema = new Schema({
  projectId: {type: String, required: true},
  skillId: {type: String, required: true},
  skillName: {type: String, required: true},
});

ProjectSkillSchema.index({projectId: 1, skillId: 1}, {unique: true});

module.exports = mongoose.model('ProjectSkill', ProjectSkillSchema, 'ProjectSkill');