

let express = require('express');
let bodyParser = require('body-parser');
//var mysql = require('mysql');
let myconfig = require('./sql/config.js');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const routes = require('./routes/routes');

let app = express();


app.use(bodyParser.json());
app.use("/",routes);






app.listen(3000, function(){
  console.log("Server is on!");
})
