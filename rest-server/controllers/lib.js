const {key} = require('../auth/constants');
const jwt = require('jsonwebtoken');

exports.paginate = (req) => {
  let pagin = {};
  if ( req.query._start !== undefined && req.query._end !== undefined){
    const start = Number(req.query._start);
    pagin['skip'] = start;
    pagin['limit'] = Number(req.query._end) - start;
  }
  return pagin;
};

exports.jwtDecode = (token) => {
  // remove 'bearer'
  token = token.substring(7, token.length);
  const payload = jwt.decode(token, key);
  return payload.user;
};
