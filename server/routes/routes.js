const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../sql/connection');
const pool = connection;



/*
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
*/

router.post("/api/account/signup",(req,res)=>{
  pool.getConnection(function(err, connection) {

    let myemail = [req.body.email];
    let my_username = [req.body.username];

    if( typeof req.body.email === 'undefined' ) {
      // foo could get resolved and it's defined
      res.json({"error": "underfined"})
      return;
    } 
    if (err){
      console.log("there is an error");
       throw err;
    }
    let q = "select email from users where email = ?";
    var sql = "INSERT INTO users (username, password, email) values ?";
    let search_username = 'SELECT username FROM users WHERE username =?';

    connection.query(q, myemail, function (err, result) {

      if (err){ throw err};
      
      if (result.length > 0){
        res.json({"error": "User_Found"});
      }
      else {
        
        connection.query(search_username,my_username,(err, result)=>{

          if (err) {
            throw err;
          }
          if (result === 0){
          let myhastpass = passwordHash.generate(req.body.password);
          let mypost = [[req.body.username, myhastpass, req.body.email]];

          connection.query(sql,[mypost], function (err, result)
           {
            if(err){
             throw err;
            }
            console.log("1 record inserted");
            connection.query(q, myemail,(err, result)=>{

              let row = JSON.stringify(result)
              let data = JSON.parse(row);
 
              const user = {
               id: data[0].id,
               username: data[0].username,
               email: data[0].email
              }
 
              jwt.sign({user: user}, 'mysecrectkey', (err, token) =>
               {
                res.json({"success": "valid","token": token});
               });
            });
          });
          } else{
            res.json({
              "error": "username taken"
            });
          }

        });        
      }
    });
  });
});


router.post("/api/account/login", (req, res)=>{

  const myemail = [req.body.email];
  
  pool.getConnection((err, connection) => {
    const query = "select * from users where email = ?";

    connection.query(query,myemail,(err, result) => {

      if (err){
        throw err;
      }

      if (result.length === 1){
        

        let mypass = result[0].password;
        

        if (passwordHash.verify(req.body.password, mypass)){

          let row = JSON.stringify(result);
          let data = JSON.parse(row);

          const user = {
            id: data[0].id,
            username: data[0].username,
            email: data[0].email
          };

          jwt.sign({user: user}, 'mysecrectkey', (err, token) => {

            res.json({"success": "valid","token": token});
          });

        } else{
          res.json({"error": "invalid username or password"});
        }

      } else{
        res.json({"error": "invalid username or password"});
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
  /*
  may not need
  router.get("/api/favorite_groups",(req, res)=>{
  
  });
  router.post("/api/favorite_groups/add", (req, res)=>{
  
  });
  */
  router.get("/api/groups/comments",(req, res)=>{
  
  });
  router.post("/api/groups/comments/add",(req, res)=>{
  
  });



module.exports = router;