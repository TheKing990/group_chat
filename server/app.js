

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var mysql = require('mysql');
let myconfig = require('./sql/config.js');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');

console.log('my databases is' + myconfig.myFunc1().database);
var pool  = mysql.createPool({
  host     : myconfig.myFunc1().host,
  user     : myconfig.myFunc1().user,
  password : myconfig.myFunc1().password,
  database : myconfig.myFunc1().database
});



pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
  connection.query('select * from  users;', function (error, results, fields) {
    if (error) throw error;
    console.log("length is " + results.length)
    console.log('The solution is: ', results[0].username);

    console.log('The solution is: ', results[0].password);
  });
});


app.use(bodyParser.json());

app.get("/",function(req, res){
  res.send("is on!");
})

app.post("api/logIn", (req, res)=>{

});


app.post("/api/account/signup",(req,res)=>{
  console.log("hey");

  console.log("the user name is " + req.body.username);



  pool.getConnection(function(err, connection) {
    let myusername = [req.body.username];
    let mypost = [[req.body.username, req.body.password]];
    
    if( typeof req.body.username === 'undefined' ) {
      // foo could get resolved and it's defined
      res.json({"error": "underfined"})
      return;
    } 

    if (err){
      console.log("there is an error");
       throw err;
    }
    let q = "select username from users where username = ?";
    var sql = "INSERT INTO users (username, password) values ?";
    connection.query(q,myusername, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      if (result.length > 0){
        res.json({"error": "found"});
      }
      else {
        connection.query(sql,[mypost], function (err, result) {
          if(err){
            console.log("there is an adding ");
          }
           console.log("1 record inserted");
           res.json({"error": "none"});
        });
      }
    });


  });

});

app.get("/api/groups",(req,res)=>{
  res.send("this get the groups");
});
app.post("/api/groups/add",(req,res)=>{
  console.log("jlkajfla");
/*
  pool.getConnection(function(error, connection){
    let myusernmae  =req.body.username, req.body.passwo;
    if (err) throw err;
    var q = "Select username from users where username = ?";
    connection.query(1, )


  });
*/


});

app.get("/api/account",(req,res)=>{
  res.send("this get the groups");
});

app.get("/api/favorite_groups",(req, res)=>{

});
app.post("/api/favorite_groups/add", (req, res)=>{

});
app.get("/api/groups/comments",(req, res)=>{

});
app.post("/api/groups/comments/add",(req, res)=>{

});


app.listen(3000, function(){
  console.log("Server is on!");
})
