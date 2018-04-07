var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(reqTopic, msg_payload, resTopic, callback){
    console.log('Making Request: ', reqTopic);
	rpc.makeRequest(reqTopic, msg_payload, resTopic, function(err, response){

		if(err)
			console.error(err);
		else{
			console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;
