const mongoose = require('mongoose');
const Admin = mongoose.mongo.Admin;

mongoose.connect('mongodb://localhost:27017/flc', {}, (err) => {
  if (err)
    console.log("Connection Error", err);
  else
    console.log("Connection Ready to use");
});

module.exports = mongoose;


