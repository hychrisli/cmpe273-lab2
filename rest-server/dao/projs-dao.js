const {cnxPool, queryPromise, updatePromise, insertPromise} = require('./db');
const Crud = require('mysql-crud');
const projCrud = Crud(cnxPool, 'PROJECT');

module.exports = {

  retrieveAll: (filter)=>{
    return queryPromise(projCrud.load, filter);
  },

  retrieve: (project_id)=>{
    return queryPromise(projCrud.load, {id: project_id});
  },

  insert: (attr)=>{
    return insertPromise(projCrud.create, attr);
  },

  update: (project_id, attr)=>{
    return updatePromise(projCrud.update, {id: project_id}, attr);
  }

};