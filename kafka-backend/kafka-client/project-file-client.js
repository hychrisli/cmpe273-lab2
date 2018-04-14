const conn = require('./connect');
const projectFileSvc = require('../services/project-file-service');
const handler = require('./handler');

const {
  FLC_TPC_PROJECT_FILE,
  GET_ALL,
  GET_ONE,
  POST,
  DELETE,
} = require('./constants');

const projectFileConsumer = new conn.getConsumer(FLC_TPC_PROJECT_FILE);

projectFileConsumer.on('message', function (message) {
  const req = JSON.parse(message.value);
  console.log('Request Received: ', message.topic, req.type);
  switch (req.type) {
    case GET_ALL:
      projectFileSvc.handleGetProjectFiles(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case GET_ONE:
      projectFileSvc.handleGetProjectFile(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case POST:
      projectFileSvc.handlePostProjectFile(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
    case DELETE:
      projectFileSvc.handleDeleteProjectFile(req.data, (err, data) => {
        handler.genericProduce(err, data, req)
      });
      break;
  }
});

projectFileConsumer.on('error', (err) => {
  console.log(err);
});

projectFileConsumer.on('offsetOutOfRange', (topic)=>{
  handler.handleOutOfRange(topic, projectFileConsumer);
});