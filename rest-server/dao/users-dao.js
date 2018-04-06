const {cnxPool, queryPromise, updatePromise, insertPromise} = require('./db');
const Crud = require('mysql-crud');
const userCrud = Crud(cnxPool, 'USER');

module.exports = {

  retrieveAll: () => {
    return queryPromise(userCrud.load, {});
  },

  retrieve: (id) => {
    return queryPromise(userCrud.load, {id});
  },

  retrieveByUserName: (username) => {
    return queryPromise(userCrud.load, {username});
  },

  insert: (attr) => {
    return insertPromise(userCrud.create, attr);
  },

  update: (username, attr) => {
    return updatePromise(userCrud.update, {username: username}, attr);
  }
};

