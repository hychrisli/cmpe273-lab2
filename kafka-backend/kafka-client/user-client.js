const connection = require('./connect');
const userSvc = require('../services/user-service');
const handler = require('./handler');

const {
  FLC_TPC_GET_USERS_RQ,
  FLC_TPC_GET_USER_BY_ID_RQ,
  FLC_TPC_POST_USER_RQ
} = require('./topics');

const consumerGetUsers = new connection.getConsumer(FLC_TPC_GET_USERS_RQ);
const consumerGetUserById = new  connection.getConsumer(FLC_TPC_GET_USER_BY_ID_RQ);
const consumerPostUser  = new connection.getConsumer(FLC_TPC_POST_USER_RQ);

consumerGetUsers.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handleGetUsers(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});

consumerGetUserById.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handleGetUserById(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});

consumerPostUser.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handlePostUser(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});