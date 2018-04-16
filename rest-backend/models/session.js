const mongoose = require('./db');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  username: {type: String, unique: true, required: true, dropDups: true},
  jwt: {type: String, unique:true, required: true},
  expire: {type: Date, required: true}
});

module.exports = mongoose.model('Session', SessionSchema, 'Session');

