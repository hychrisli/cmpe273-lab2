const mongoose = require('./db');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true, dropDups: true},
  firstName: String,
  lastName: String,
  password: {type: String, required: true},
  email: {type: String, required:true},
  image: String,
  imageUrl: String,
  aboutMe: String,
});

module.exports = mongoose.model('User', UserSchema, 'User');