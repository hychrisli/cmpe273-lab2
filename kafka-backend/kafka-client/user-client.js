const connection = require('./connect');
const userSvc = require('../services/user-service');
const handler = require('./handler');

const {
  FLC_TPC_GET_USERS_RQ,
  FLC_TPC_GET_USER_RQ,
  FLC_TPC_POST_USER_RQ,
  FLC_TPC_UPD_USER_RQ
} = require('./topics');

const consumerGetUsers = new connection.getConsumer(FLC_TPC_GET_USERS_RQ);
const consumerGetUser = new  connection.getConsumer(FLC_TPC_GET_USER_RQ);
const consumerPostUser  = new connection.getConsumer(FLC_TPC_POST_USER_RQ);
const consumerUpdUser = new connection.getConsumer(FLC_TPC_UPD_USER_RQ);

consumerGetUsers.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handleGetUsers(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});

consumerGetUser.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handleGetUser(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});

consumerPostUser.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handlePostUser(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});

consumerUpdUser.on('message', function (message) {
  console.log('Request Received: ', message.topic);
  const req = JSON.parse(message.value);
  userSvc.handleUpdUser(req.data, (err, data) => {handler.genericProduce(err, data, req)});
});