// uses express API to process http request
const express = require('express');
const app = express();
var Request = require("request");

//Cross origin resource sharing to enable communication between port 4200(Angular) and port 3000(Node)
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

//recognizes http request and executes function to fetch itunes based on selected form values.
// Once the result obtained, returns it back in json format
app.use('/api/result/:id?',(req,res) => {
  console.log(req.query);
  var url = "https://itunes.apple.com/search?";
  var attrList = JSON.parse(req.query.value);
  var index = [];
  for (var x in attrList) {
    console.log(attrList[x]);
   if(attrList[x] != '' && attrList[x] != null){
      index.push(x);
    }
  }
  for(var i=0; i<index.length; i++){
    var val = attrList[index[i]];
    if(i>0){
      url += `&`+index[i]+`=`+val;
    }else{
      var termVal = val.replace(" ","+");
      url += index[i]+`=`+termVal;
    }
  }
  console.log(url);
  Request.get(url, (error, response, body) =>{
    if(error){
      return console.log(error);
    }
    console.log(JSON.parse(body));
    return res.json(JSON.parse(body));
  });

});

module.exports = app;
