const connection = new require('./Connection');
const userSvc = require('../services/user-service');

const {
  FLC_TPC_GET_USERS_RQ
} = require('./topics');

const getUsersConsumer = connection.getConsumer(FLC_TPC_GET_USERS_RQ);
const producer = connection.getProducer();

getUsersConsumer.on('message', function (message) {
  console.log('Request Received: ', FLC_TPC_GET_USERS_RQ);
  const req = JSON.parse(message.value);
  userSvc.handleGetUsers(req.data, function (err, vals) {

    if (err) console.log(err);
    else {
      const payloads = [
        {
          topic: req.replyTo,
          messages: JSON.stringify({
            correlationId: req.correlationId,
            data: vals
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function (err) {
        if (err) console.log(err);
      });
    }
  });
});
