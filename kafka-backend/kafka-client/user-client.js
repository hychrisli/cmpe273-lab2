const conn = require('./connect');
const userSvc = require('../services/user-service');
const handler = require('./handler');

const {
  FLC_TPC_USER,
  GET_ALL,
  GET_ONE,
  PUT,
  POST
} = require('./constants');

const userConsumer = new conn.getConsumer(FLC_TPC_USER);


userConsumer.on('message', function (message) {
  try{
    const req = JSON.parse(message.value);
    console.log('Request Received: ', message.topic, req.type);
    switch (req.type) {
      case GET_ALL:
        userSvc.handleGetUsers(req.data, (err, data) => {
          handler.genericProduce(err, data, req)
        });
        break;
      case GET_ONE:
        userSvc.handleGetUser(req.data, (err, data) => {
          handler.genericProduce(err, data, req)
        });
        break;
      case POST:
        userSvc.handlePostUser(req.data, (err, data) => {
          handler.genericProduce(err, data, req)
        });
        break;
      case PUT:
        userSvc.handleUpdUser(req.data, (err, data) => {
          handler.genericProduce(err, data, req)
        });
    }
  } catch (e) {
    console.log(e)
  }

});

userConsumer.on('error', (err) => {
  console.log(err);
});

userConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, userConsumer);
});