const mongoose = require('mongoose');
const Admin = mongoose.mongo.Admin;

const db = process.env.MONGODB;
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;


mongoose.connect(db, {user, pass}, (err) => {
  if (err)
    console.log("Connection Error", err);
  else
    console.log("Connection Ready to use");
});

module.exports = mongoose;


