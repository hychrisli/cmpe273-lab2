const mongoose = require('mongoose');
const Admin = mongoose.mongo.Admin;

mongoose.connect('mongodb://localhost:27017/flc', {}, (err) => {
  if (err)
    console.log("Mongo DB Connection Error", err);
  else
    console.log("Mongo DB Connection Ready!");
});

module.exports = mongoose;


