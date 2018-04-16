const mongoose = require('mongoose');
const Admin = mongoose.mongo.Admin;

const db = process.env.MONGODB;
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;

mongoose.createConnection(db, {user, pass, poolSize: 20}, (err) => {
  if (err)
    console.log("Mongo DB Connection Error", err);
  else
    console.log("Mongo DB Connection Ready!");
});



/*mongoose.connect(db, {user, pass, poolSize: 20}, (err) => {
  if (err)
    console.log("Mongo DB Connection Error", err);
  else
    console.log("Mongo DB Connection Ready!");
});*/

module.exports = mongoose;


