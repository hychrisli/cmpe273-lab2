


// Success Response
exports.sendCreated = (res, data=null) => {
  if (data === null){
    res = setObjectHeader(res);
    res.status(201).send({success: true, message: "created"});
  }
  else
    this.sendDoc(res.status(201), data);
};

exports.sendArray = (res, array, total=0) => {
  res = setArrayHeader(res, array, total);
  let jsonStr = JSON.stringify(array);
  if ( jsonStr !== null && jsonStr !== undefined)
    jsonStr = jsonStr.replace(/\"_id\":/g, "\"id\":");
  res.send(jsonStr);
};

exports.sendOK = (res, msg='') => {
  res = setObjectHeader(res);
  res.send({success: true, message: msg === '' ? 'OK' : msg})
};

exports.sendDoc = (res, doc) => {
  res = setObjectHeader(res);
  let jsonStr = JSON.stringify(doc);
  if ( jsonStr !== null && jsonStr !== undefined)
    jsonStr = jsonStr.replace("\"_id\":", "\"id\":");
  res.send(jsonStr);
};

// Failure Response
exports.sendInternalSystemError = (res, err) => {
  console.log(err);
  res = setObjectHeader(res);
  res.status(500).send({success: false, message: "Internal System Error", error: err});
};

exports.sendNotFound = (res, err) => {
  console.log(err);
  res = setObjectHeader(res);
  res.status(404).send({success: false, message: "Not Found"});
};

exports.sendBadRequest = (res, msg) => {
  res = setObjectHeader(res);
  res.status(400).send({success: false, message: "Bad Request: " + msg });
};

const setObjectHeader = (res) => {
  return setArrayHeader(res, [], 1);
};

const setArrayHeader = (res, array, total=0) => {
  if (total === 0)
    res.set('X-Total-Count', array.length);
  else
    res.set('X-Total-Count', total);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  return res;
};
