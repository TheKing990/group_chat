const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../sql/connection');
const pool = connection;
const verify_t = require('../middleware/mw');



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
    console.log(my_username);

    if( typeof req.body.email === 'undefined' || typeof req.body.username === 'undefined' ) {
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
        
        connection.query(search_username,my_username,(err, username_result)=>{
          console.log(username_result.length);

          if (err) {
            throw err;
          }

          if (username_result == 0)
          {
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

  router.get('/api/friends', verify_t,(req, res)=>{
    jwt.verify(req.token, 'mysecrectkey',(err, auth_data)=>{

      if (err){
        res.sendStatus(403)

      } else{
        console.log(auth_data);
        get_friends_query = 'select users.id, users.username, users.email from users inner join friends on friends.friend_id = users.id and friends.user_id = ?;';
        user_id = [auth_data.user.id];
        console.log("the user id is " + user_id);
        connection.query(get_friends_query, user_id,(err, result)=>{
          let row = JSON.stringify(result);
          let data = JSON.parse(row);
          res.json(data);

        });
      }

    });

  });
  //get the conversation of this two people, if they have not talk then add it to the converstion table
  router.post("/api/send/message", verify_t,(req, res)=>{
    jwt.verify(req.token,'mysecrectkey',(err, auth_data)=>{ 

      if (err){
        res.sendStatus(403)

      } else{
        item_q = [[auth_data.user.id, req.body.user_two]];
        users_q = [auth_data.user.id, req.body.user_two, req.body.user_two,auth_data.user.id];
        console.log("op is "+auth_data.user.id + "and other is " +req.body.user_two);
       
        query = "INSERT INTO message_c (user_one, user_two) values (?) ;";
        con_query =  "select id from message_c where (user_one = ? and user_two = ?) or (user_one = ? and user_two = ?);";
        let  message_conv_id = ' ';
        
        query2 = "insert into conversation_reply (reply, user_id_fk, c_id_fk ) values (?);";
        
        connection.query(con_query, users_q,(err, results)=>{
          if (err){
            console.log("select suff")
            throw err;
          }
          let stringify = JSON.stringify(results);
          let data = JSON.parse(stringify);
         
          console.log("the lenght is " + data.length);
          

          if (data.length == 0){

            
            connection.query(query, item_q,(err, result)=>{
              if (err){
              console.log("first err")
                throw err;}

            message_conv_id = result.insertId;
            
               
                
              console.log ("the message is " + req.body.message + " the time is  and the id of the conv is " + message_conv_id);
              items2 = [[req.body.message, req.body.user_two, message_conv_id]];
          
              connection.query(query2, items2,(err, result)=>{
                if (err) throw err;
                res.json({
                  "message": "send"
                })
              });
  
            });

          } else{
            console.log(data[0].id);
            message_conv_id = data[0].id;
            items2 = [[req.body.message, req.body.user_two, message_conv_id]];
            connection.query(query2, items2,(err, result)=>{
              if (err) throw err;
              res.json({
                "message": "send"
              })
            });
          }

          


          
        });
      }

    });

  });
  
  router.get("/api/groups",(req,res)=>{
    res.send("this get the groups");
  });
  router.post("/api/groups/add",(req,res)=>{
    console.log("jlkajfla");
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