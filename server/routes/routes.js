const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const myconfig = require('../sql/config');

const connection = require('../sql/connection');
const pool = connection;



router.get('/api/',(req, res) =>{

    pool.getConnection(function(err, connection) {
        if(err){
            console.log("bad con");
        }
        // connected! (unless `err` is set)
        connection.query('select * from  users;', function (error, results, fields) {
          if (error) throw error;
          console.log("length is " + results.length)
          console.log('The solution is: ', results[0].username);
      
          console.log('The solution is: ', results[0].password);
          res.json ({
              "the username is ": results[0].username
          })
        });
      });

});


router.post("/api/account/login", (req, res)=>{
    console.log("login req");

console.log('my databases is' +myconfig.myFunc1().database);
   
   const myuser = [req.body.username];
  
  
    pool.getConnection((err, connection) => {
      const query = "select * from users where username = ?";
      connection.query(query,myuser,(err, result) =>
       {
  
        if (err){
          console.log("err!")
          res.json({"error": "invalid input"});
        }
  
        if(result.length === 0){
          res.json({"error": "no User or pass"});
         
        }
         
        else if (result.length ===1 )
        {
          let mypass = result[0].password;
          console.log(result);
          
  
          if (passwordHash.verify(req.body.password, mypass))
          {
             console.log("is ogood");
             isverify = true;
             let row = JSON.stringify(result)
             let data = JSON.parse(row);
  
            const user = {
              id: data[0].id,
              username: data[0].username
             }
  
            jwt.sign({user: user}, 'mysecrectkey', (err, token) => {
              console.log("token ogood");
              res.json({"success": "valid","token": token});
  
  
            });
          }
         else {
            console.log("is badd");
            res.json({"error": "invalid"});
          }
        
      }
      else {
        
          isverify = false; 
      }
  
    });
  
  
  });
  
    
  
  
  
  });
  
  
  router.post("/api/account/signup",(req,res)=>{
    console.log("hey");
  
    console.log("the user name is " + req.body.username);
  
  
  
    pool.getConnection(function(err, connection) {
      let myusername = [req.body.username];
      
      
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
          var myhastpass = passwordHash.generate(req.body.password);
          let mypost = [[req.body.username, myhastpass]];
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
  
  router.get("/api/groups",(req,res)=>{
    res.send("this get the groups");
  });
  router.post("/api/groups/add",(req,res)=>{
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
  
  router.get("/api/account",(req,res)=>{
    res.send("this get the groups");
  });
  
  router.get("/api/favorite_groups",(req, res)=>{
  
  });
  router.post("/api/favorite_groups/add", (req, res)=>{
  
  });
  router.get("/api/groups/comments",(req, res)=>{
  
  });
  router.post("/api/groups/comments/add",(req, res)=>{
  
  });



module.exports = router;