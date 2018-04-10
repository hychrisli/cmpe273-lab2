const conn = require('./connect');
const sessionSvc = require('../services/session-service');
const handler = require('./handler');

const {
  FLC_TPC_SESSION,
  GET_ONE,
  DELETE,
  POST
} = require('./constants');

const userConsumer = new conn.getConsumer(FLC_TPC_SESSION);

userConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ONE:
      sessionSvc.handleGetSession(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      sessionSvc.handlePostSession(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case DELETE:
      sessionSvc.handleDeleteSession(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});