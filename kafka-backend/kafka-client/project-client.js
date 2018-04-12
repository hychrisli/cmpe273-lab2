const conn = require('./connect');
const projectSvc = require('../services/project-service');
const handler = require('./handler');

const {
  FLC_TPC_PROJECT,
  GET_ALL,
  GET_ONE,
  PUT,
  POST
} = require('./constants');

const projectConsumer = new conn.getConsumer(FLC_TPC_PROJECT);

projectConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      projectSvc.handleGetProjects(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case GET_ONE:
      projectSvc.handleGetProject(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      projectSvc.handlePostProject(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case PUT:
      projectSvc.handlePutProject(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});

projectConsumer.on('error', (err) => {
  console.log(err);
});

projectConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, projectConsumer);
});