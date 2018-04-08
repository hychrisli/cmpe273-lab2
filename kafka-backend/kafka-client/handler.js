const connection = new require('./connect');
const producer = connection.getProducer();

produce = (req, data) => {
  const payloads = [
    {
      topic: req.replyTo,
      messages: JSON.stringify({
        correlationId: req.correlationId,
        data: data
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function (err) {
    if (err) console.log(err);
    else console.log('Response Sent: ', req.replyTo);
  });
};

exports.genericProduce = (err, data, req) => {
  if (err) console.log(err);
  else produce(req, data);
};