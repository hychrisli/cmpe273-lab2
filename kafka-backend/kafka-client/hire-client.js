const conn = require('./connect');
const hireSvc = require('../services/hire-service');
const handler = require('./handler');

const {
  FLC_TPC_HIRE,
  PUT,
} = require('./constants');

const hireConsumer = new conn.getConsumer(FLC_TPC_HIRE);

hireConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case PUT:
      hireSvc.handleHire(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});

hireConsumer.on('error', (err) => {
  console.log(err);
});

hireConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, hireConsumer);
});