const mongoose = require('./db');
const Schema = mongoose.Schema;

const UserSkillSchema = new Schema({
  userId: {type: string, required: true},
  skillId: {type: string, required: true}
});

module.exports = mongoose.model('UserSkill', UserSkillSchema, 'UserSkill');