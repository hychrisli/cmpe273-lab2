


// Success Response
exports.sendCreated = (res) => {
  res = setObjectHeader(res);
  res.status(201).send({success: true, message: "created"});
};

exports.sendArray = (res, array) => {
  res = setArrayHeader(res, array);
  let jsonStr = JSON.stringify(array);
  jsonStr = jsonStr.replace(/\"_id\":/g, "\"id\":");
  res.send(jsonStr);
};

// Failure Response
exports.sendInternalSystemError = (res, err) => {
  console.log(err);
  res = setObjectHeader(res);
  res.status(500).send({success: false, message: "Internal System Error"});
};

exports.sendNotFound = (res, err) => {
  console.log(err);
  res = setObjectHeader(res);
  res.status(404).send({success: false, message: "Not Found"});
};

exports.sendBadRequest = (res, msg) => {
  res = setObjectHeader(res);
  res.status(401).send({success: false, message: "Bad Request: " + msg });
};

const setObjectHeader = (res) => {
  return setArrayHeader(res, [1]);
};

const setArrayHeader = (res, array) => {
  res.set('X-Total-Count', array.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  return res;
};
