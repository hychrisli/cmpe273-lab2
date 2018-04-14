const conn = require('./connect');
const balanceSvc = require('../services/balance-service');
const handler = require('./handler');

const {
  FLC_TPC_BALANCE,
  GET_ONE,
  PUT
} = require('./constants');

const balanceConsumer = new conn.getConsumer(FLC_TPC_BALANCE);

balanceConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ONE:
      balanceSvc.handleGetBalance(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case PUT:
      balanceSvc.handleAddBalance(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
  }
});

balanceConsumer.on('error', (err) => {
  console.log(err);
});

balanceConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, balanceConsumer);
});