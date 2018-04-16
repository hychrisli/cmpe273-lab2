const mysql = require('mysql');
const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const config = require('config');

exports.cnxPool = mysql.createPool({
  connectionLimit: 20,
  host: config.get("DBHost"),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: config.get("Database")
});

exports.countPromise = (table, where={}) => {
  const myQuery = 'SELECT COUNT(*) cnt FROM ' + table + genWhereCondition(where);
  console.log(myQuery);
  return new Promise((resolve, reject) => {
    this.cnxPool.query(myQuery,
      (error, results) => {
      if (error) return reject(error);
      resolve(results);
    })
  })
};

exports.avgPromise = (table, attr, where={}) => {

  const myQuery = 'SELECT avg('+ attr +') avg_price FROM ' + table + genWhereCondition(where);
  console.log(myQuery);
  return new Promise((resolve, reject) => {
    this.cnxPool.query(myQuery,
      (error, results) => {
        if (error) return reject(error);
        resolve(results);
      })
  })
};


exports.insertIgnoreMultiPromise = (table, attrs, multiAttrName) => {

  let keys = [];
  let vals = [];
  for ( let key in attrs ){
    if ( key !== multiAttrName ){
      keys.push(key);
      vals.push(attrs[key]);
    }
  }
  keys.push(multiAttrName);
  const colStr = '(' + keys.join(',') + ')';
  const valStr = "('" + vals.join("','");
  const tuples = [];
  const multi = attrs[multiAttrName];

  for ( let i =0; i < multi.length; i++){
    tuples.push(valStr + "','" + multi[i] + "')")
  }

  const myQuery = 'INSERT IGNORE INTO ' + table + colStr + ' VALUES ' + tuples.join(',');
  console.log(myQuery);

  return new Promise((resolve, reject) => {
    this.cnxPool.query(myQuery,
      (error, results) => {
        if (error) return reject(error);
        resolve(results);
      })
  })
};

exports.queryPromise = (func, where, pagin={}) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    }, pagin)
  })
};

exports.insertPromise = (func, where) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};

exports.updatePromise = (func, slct, attr) => {
  return new Promise((resolve, reject) => {
    func(slct, attr, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};

exports.deletePromise = (func, where) => {
  return new Promise((resolve, reject) => {
    func(where, (err, val) => {
      if (err) return reject(err);
      resolve(val);
    })
  })
};

function genWhereCondition(where) {

  const isEmpty = Object.keys(where).length === 0 && where.constructor === Object;

  const condis = [];

  for ( let key in where ){
    let condi = key + " ='" + where[key] + "'";
    condis.push(condi);
  }

  return isEmpty ? '' : ' WHERE ' + condis.join(' AND ');
}