

exports.genericCallback = (err, data, cb) => {
  if (err) {
    console.log(err);
    cb(err)
  }
  else cb(null, data);
};