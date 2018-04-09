

exports.genericCallback = (err, data, cb) => {
  if (err) cb(err);
  else cb(null, data);
};