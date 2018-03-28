const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {key} = require('./constants');
const User = require('../models/user');

module.exports = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, cb) => {
    console.log("here auth: ", jwt_payload);
    User.find({_id: jwt_payload.user._id}, (err, docs) => {
      if ( err )
        cb(err, false);
      else if (docs.length < 1)
        cb(null, false);
      else
        cb(null, docs[0]);
    })
  }))
};