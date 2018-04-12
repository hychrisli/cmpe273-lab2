const conn = require('./connect');
const bidSvc = require('../services/bid-service');
const handler = require('./handler');

const {
  FLC_TPC_BID,
  GET_ALL,
  GET_ONE,
  POST,
  DELETE
} = require('./constants');

const bidConsumer = new conn.getConsumer(FLC_TPC_BID);

bidConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      bidSvc.handleGetBids(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case GET_ONE:
      bidSvc.handleGetBid(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      bidSvc.handlePostBid(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case DELETE:
      bidSvc.handleDelBid(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
  }
});

bidConsumer.on('error', (err) => {
  console.log(err);
});

bidConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, bidConsumer);
});