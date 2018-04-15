const conn = require('./connect');
const paymentSvc = require('../services/payment-service');
const handler = require('./handler');

const {
  FLC_TPC_PAYMENT,
  GET_ALL,
  POST
} = require('./constants');

const paymentConsumer = new conn.getConsumer(FLC_TPC_PAYMENT);

paymentConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      paymentSvc.handleGetPayments(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      paymentSvc.handleMakePayment(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
  }
});

paymentConsumer.on('error', (err) => {
  console.log(err);
});

paymentConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, paymentConsumer);
});