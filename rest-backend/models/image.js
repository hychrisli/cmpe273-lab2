const mongoose = require('./db');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  userId: {type: String, required: true, unique: true},
  username: {type: String, required: true, uique: true},
  base64Img: {type: String, required: true},
});

module.exports = mongoose.model('Image', ImageSchema, 'Image');