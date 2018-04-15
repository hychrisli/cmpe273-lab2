var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(topic, type, msg_payload, callback) {
  console.log('Making Request: ', topic, type);
  rpc.makeRequest(topic, type, msg_payload, function (err, response) {

    if (err){
      console.error(err);
      callback(err);
    }
    else {
      //console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
