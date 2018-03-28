


// Success Response
exports.sendCreated = (res) => {
  res.status(201).send({success: true, message: "created"});
};

// Failure Response
exports.sendInternalSystemError = (res, err) => {
  console.log(err);
  res.status(500).send({success: false, message: "Internal System Error"});
};

exports.sendNotFound = (res, err) => {
  console.log(err);
  res.status(404).send({success: false, message: "Not Found"});
};

exports.sendBadRequest = (res, msg) => {
  res.status(401).send({success: false, message: "Bad Request: " + msg });
};

