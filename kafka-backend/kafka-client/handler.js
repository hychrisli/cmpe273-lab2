const connection = new require('./connect');
const producer = connection.getProducer();

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