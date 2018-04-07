function handle_request(msg, callback){

  var res = {};
  console.log("In handle request:"+ JSON.stringify(msg));
  res.code = 200;
  res.value = "OK";
  callback(null, res);
}

exports.handle_request = handle_request;