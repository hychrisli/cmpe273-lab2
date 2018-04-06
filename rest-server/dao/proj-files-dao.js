const {cnxPool, queryPromise, insertPromise, deletePromise} = require('./db');
const Crud = require('mysql-crud');
const projFileCrud = Crud(cnxPool, 'PROJECT_FILE');

module.exports = {

  retrieve: (filter)=>{
    return queryPromise(projFileCrud.load, filter);
  },

  insert: (attr)=>{
    return insertPromise(projFileCrud.create, attr);
  },

  delete: (attr) => {
    return deletePromise(projFileCrud.destroy, attr);
  }
};