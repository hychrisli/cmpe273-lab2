var connection =  new require('./Connection');
var userSvc = require('../services/user-service');

var topic_name = 'testing';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();




console.log('server is running');
consumer.on('message', function (message) {
  console.log('message received');
  console.log(JSON.stringify(message.value));
  var data = JSON.parse(message.value);
  userSvc.handle_request(data.data, function (err, res) {
    console.log('after handle' + res);
    var payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: res
        }),
        partition: 0
      }
    ];
    producer.send(payloads, function (err, data) {
      console.log(data);
    });
    return;
  });
});
