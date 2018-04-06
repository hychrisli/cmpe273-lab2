const {cnxPool, queryPromise, updatePromise, insertPromise,
  deletePromise, countPromise, avgPromise} = require('./db');
const Crud = require('mysql-crud');
const projBidCrud = Crud(cnxPool, 'PROJECT_BID');

module.exports = {

  retrieveAll: (filter)=>{
    return queryPromise(projBidCrud.load, filter);
  },

  retrieveBid: (bid_id)=>{
    return queryPromise(projBidCrud.load, {id: bid_id});
  },

  insertBid: (attr)=>{
    return insertPromise(projBidCrud.create, attr);
  },

  update: (where, attr)=>{
    return updatePromise(projBidCrud.update, where, attr);
  },

  deleteBid: (bid_id) => {
    return deletePromise(projBidCrud.destroy, {id: bid_id})
  },

  countBids: (where) =>{
    return countPromise('PROJECT_BID', where);
  },

  avgBidPrice:(attr, where)=> {
    return avgPromise('PROJECT_BID', attr, where);
  }

};