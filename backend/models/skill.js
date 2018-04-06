const mongoose = require('./db');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  skillName: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('Skill', SkillSchema, 'Skill');