var mysql = require('mysql');
const myconfig = require('./config');

const pool  = mysql.createPool(myconfig.myFunc1());

module.exports = pool;