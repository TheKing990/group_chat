var mysql = require('mysql');
let myconfig = require('./config');

const pool  = mysql.createPool(myconfig.myFunc1());

module.exports = pool;