const conn = require('./connect');
const matchSvc = require('../services/match-service');
const handler = require('./handler');

const {
  FLC_TPC_MATCH,
  GET_ALL,
} = require('./constants');

const matchConsumer = new conn.getConsumer(FLC_TPC_MATCH);


matchConsumer.on('message', function (message) {
  try{
    const req = JSON.parse(message.value);
    console.log('Request Received: ', message.topic, req.type);
    switch (req.type) {
      case GET_ALL:
        matchSvc.handleGetMatchedProjects(req.data, (err, data) => {
          handler.genericProduce(err, data, req)
        });
        break;
    }
  } catch (e) {
    console.log(e)
  }

});

matchConsumer.on('error', (err) => {
  console.log(err);
});

matchConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, matchConsumer);
});