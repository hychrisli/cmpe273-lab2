const {cnxPool, queryPromise, insertIgnoreMultiPromise} = require('./db');
const Crud = require('mysql-crud');
const projSkillCrud = Crud(cnxPool, 'PROJECT_SKILL');

module.exports = {

  retrieve: (filter)=>{
    return queryPromise(projSkillCrud.load, filter);
  },

  insert: (attrs, multiAttrName)=>{
    return insertIgnoreMultiPromise('PROJECT_SKILL', attrs, multiAttrName);
  },
};