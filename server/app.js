var express=require('express');
var http=require('http');

var app=express();
var config=require('./config/')(app);

require('./route/router')(app);

var server=http.createServer(app);

server.listen(config.PORT,function(){
  console.log("Server started at port : "+config.PORT);
})
