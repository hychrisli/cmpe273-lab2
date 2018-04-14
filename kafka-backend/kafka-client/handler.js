const connection = new require('./connect');
const producer = connection.getProducer();
const offset = connection.getOffset();

exports.genericProduce = (err, data, req) => {
  const payloads = [
    {
      topic: req.replyTo,
      messages: JSON.stringify({
        correlationId: req.correlationId,
        err,
        data
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function (err) {
    if (err) console.log(err);
    else console.log('Response Sent: ', req.replyTo);
  });
};

exports.handleOutOfRange = (topic, consumer) => {
  topic.maxNum = 2;
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return console.error(err);
    }
    var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
};