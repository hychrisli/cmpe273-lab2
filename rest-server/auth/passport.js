const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {key} = require('./constants');
const kafkaClient = require('../kafka-client/client');
const {
  GET_ONE,
  FLC_TPC_SESSION
} = require('../kafka-client/constants');

module.exports = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, cb) => {
    console.log("here auth: ", jwt_payload);
    kafkaClient.make_request(
      FLC_TPC_SESSION,
      GET_ONE,
      {username: jwt_payload.user.username},
      (err, data) => {
        if (err) cb(err, false);
        else if ( data === null)  cb (null, false);
        else cb(null, data);
      });


/*    User.find({_id: jwt_payload.user._id}, (err, docs) => {
      if ( err )
        cb(err, false);
      else if (docs.length < 1)
        cb(null, false);
      else
        cb(null, docs[0]);
    })*/
  }))
};