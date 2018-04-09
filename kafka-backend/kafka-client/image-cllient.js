const conn = require('./connect');
const imageSvc = require('../services/image-service');
const handler = require('./handler');

const {
  FLC_TPC_IMAGE,
  GET_ONE,
  POST
} = require('./constants');

const imageConsumer = new conn.getConsumer(FLC_TPC_IMAGE);

imageConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ONE:
      imageSvc.handleGetImage(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      imageSvc.handlePostImage(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});