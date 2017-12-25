let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var mysql = require('mysql');
let myconfig = require('./sql/config.js');
var passport = require('passport');
var LocalStrategy = require('passport-local');

console.log('my databases is' + myconfig.myFunc1().database);
var pool  = mysql.createPool({
  host     : myconfig.myFunc1().host,
  user     : myconfig.myFunc1().user,
  password : myconfig.myFunc1().password,
  database : myconfig.myFunc1().database
});

app.use(require('express-session')({
  secret: "Once again i win",
  resave: false,
  saveUninitialized: false
}));

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
  connection.query('select * from  users;', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].username);

    console.log('The solution is: ', results[0].password);
  });
});
app.use(bodyParser.json());

app.get("/",function(req, res){
  res.send("is on!");
})
app.get("/api/groups",(req,res)=>{
  res.send("this get the groups");
});
app.post("/api/groups/add",(req,res)=>{
  console.log("jlkajfla");



});

app.get("/api/account",(req,res)=>{
  res.send("this get the groups");
});
app.post("/api/account/add",(req,res)=>{

  console.log(req.body.username + ' and ' + req.body.password);



  pool.getConnection(function(err, connection) {
    let mypost = [[req.body.username, req.body.password] ];
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (username, password) values ?";
    connection.query(sql,[mypost], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });


});




});

app.post("api/logIn", (req, res)=>{

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
