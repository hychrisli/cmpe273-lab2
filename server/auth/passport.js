const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userDao = require('../dao/users-dao');
const {key} = require('./constants');

module.exports = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, cb) => {
    console.log("here auth: ", jwt_payload);
    userDao.retrieve(jwt_payload.user.id).then((val) => {
      if (val.length > 0)
        cb(null, val[0]);
      else
        cb(null, false);
    }).catch(err => cb(err, false))
  }))
};