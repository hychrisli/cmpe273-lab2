const mongoose = require('./db');
const Schema = mongoose.Schema;

const UserSkillSchema = new Schema({
  userId: {type: String, required: true},
  skillId: {type: String, required: true},
  skillName: {type: String, required: true}
});

UserSkillSchema.index({userId: 1, skillId: 1}, {unique: true});

module.exports = mongoose.model('UserSkill', UserSkillSchema, 'UserSkill');