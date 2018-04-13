const conn = require('./connect');
const projectSkillSvc = require('../services/project-skill-service');
const handler = require('./handler');

const {
  FLC_TPC_PROJECT_SKILL,
  GET_ALL,
  POST,
} = require('./constants');

const projectSkillConsumer = new conn.getConsumer(FLC_TPC_PROJECT_SKILL);

projectSkillConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      projectSkillSvc.handleGetProjectSkills(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      projectSkillSvc.handlePostProjectSkills(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});

projectSkillConsumer.on('error', (err) => {
  console.log(err);
});

projectSkillConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, projectSkillConsumer);
});