const mongoose = require('./db');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  image: String,
  imageUrl: String,
  aboutMe: String,
});

module.exports = mongoose.model('User', UserSchema, 'User');