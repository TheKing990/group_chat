let express = require('express');
let app = express();

app.get("/",function(req, res){
  res.send("is on!");
})
app.get("/api/groups",(req,res)=>{
  res.send("this get the groups");
});
app.post("/api/groups",(req,res)=>{

});

app.get("/api/favorite_groups",(req, res)=>{

});
app.post("/api/favorite_groups", (req, res)=>{

});
app.get("/api/comments",(req, res)=>{

});
app.post("/api/comments",(req, res)=>{

});

app.get("api")
app.listen(3000, function(){
  console.log("Server is on!");
})
