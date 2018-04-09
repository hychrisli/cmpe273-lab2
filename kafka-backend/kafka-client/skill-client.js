const conn = require('./connect');
const skillSvc = require('../services/skill-service');
const handler = require('./handler');

const {
  FLC_TPC_SKILL,
  GET_ALL,
  GET_ONE,
  POST
} = require('./constants');

const skillConsumer = new conn.getConsumer(FLC_TPC_SKILL);

skillConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      skillSvc.handleGetSkills(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case GET_ONE:
      skillSvc.handleGetSkill(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      skillSvc.handlePostSkill(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
  }
});