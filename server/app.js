let express = require('express');
let app = express();
let bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get("/",function(req, res){
  res.send("is on!");
})
app.get("/api/groups",(req,res)=>{
  res.send("this get the groups");
});
app.post("/api/groups/add",(req,res)=>{

});

app.get("/api/account",(req,res)=>{
  res.send("this get the groups");
});
app.post("/api/account/add",(req,res)=>{

   console.log(req.body);

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
