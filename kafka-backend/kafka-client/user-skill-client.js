const conn = require('./connect');
const userSkillSvc = require('../services/user-skill-service');
const handler = require('./handler');

const {
  FLC_TPC_USER_SKILL,
  GET_ALL,
  POST
} = require('./constants');

const userSkillConsumer = new conn.getConsumer(FLC_TPC_USER_SKILL);

userSkillConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      userSkillSvc.handleGetUserSkills(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      userSkillSvc.handlePostUserSkills(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});

userSkillConsumer.on('error', (err) => {
  console.log(err);
});

userSkillConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, userSkillConsumer);
});