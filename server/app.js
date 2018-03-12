

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

let app = express();


app.use(bodyParser.json());
app.use("/",routes);






app.listen(3000, function(){
  console.log("Server is on!");
})
