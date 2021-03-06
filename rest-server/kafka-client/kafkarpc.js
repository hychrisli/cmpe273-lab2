var crypto = require('crypto');
var conn = require('./Connection');

var TIMEOUT = 8000; //time to wait for response in ms
var self;

exports = module.exports = KafkaRPC;

function KafkaRPC() {
  self = this;
  this.connection = conn;
  this.requests = {}; //hash to store request in wait for response
  this.response_queue = {}; //placeholder for the future queue
  this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function (topic, type, data, callback) {

  self = this;
  //generate a unique correlation id for this call
  var correlationId = crypto.randomBytes(16).toString('hex');

  //create a timeout for what should happen if we don't get a response
  var tId = setTimeout(function (corr_id) {
    //if this ever gets called we didn't get a response in a
    //timely fashion
    console.log('timeout');
    callback(new Error("timeout " + corr_id));
    //delete the entry from hash
    delete self.requests[corr_id];
  }, TIMEOUT, correlationId);

  //create a request entry to store in a hash
  self.requests[correlationId] = {
    callback: callback,
    timeout: tId //the id for the timeout so we can clear it
  };

  //console.log(type);
  const replyTo = topic + '_RS';
  //make sure we have a response topic
  self.setupResponseQueue(self.producer, replyTo, function () {
    //put the request on a topic

    var payloads = [
      {
        topic,
        messages: JSON.stringify({
          correlationId,
          replyTo,
          type,
          data
        }),
        partition: 0
      }
    ];
    self.producer.send(payloads, function (err, data) {
      if (err) console.log(err);
      // else console.log('REST Server Produced: ', data);
    });
  });
};


KafkaRPC.prototype.setupResponseQueue = function (producer, resTopic, next) {
  //don't mess around if we have a queue
  if (this.response_queue[resTopic] !== undefined) return next();
  //subscribe to messages
  self = this;

  var consumer = new self.connection.getConsumer(resTopic);
  const offset = new self.connection.getOffset();
  consumer.on('message', function (message) {
    console.log('REST Server Received: ', resTopic);
    var res = JSON.parse(message.value);
    //get the correlationId
    var correlationId = res.correlationId;
    //is it a response to a pending request
    if (correlationId in self.requests) {
      //retrieve the request entry
      var entry = self.requests[correlationId];
      //make sure we don't timeout by clearing it
      clearTimeout(entry.timeout);
      //delete the entry from hash
      delete self.requests[correlationId];
      //callback, no err
      if ( res.err === undefined || res.err === null)
        entry.callback(null, res.data);
      else {
        console.log(res);
        entry.callback(res.err);
      }
    }
  });

  consumer.on('error', (err) => {
    console.log(err);
  });

  consumer.on('offsetOutOfRange', (topic)=>{
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
      if (err) {
        return console.error(err);
      }
      var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
      consumer.setOffset(topic.topic, topic.partition, min);
    });
  });

  self.response_queue[resTopic] = consumer;
  return next();
};