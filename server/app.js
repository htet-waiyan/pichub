var express=require('express');
var http=require('http');
var MongoClient=require('mongodb').MongoClient;
var db=require('./config/setting').DB;

var app=express();
var config=require('./config/')(app);

MongoClient.connect(db.connection,{url_decode_auth:true},function(err,db){
  if(err)
    throw err;

  require('./service/db/db.confactory').init(db);
  require('./route/router')(app);

  http.createServer(app)
      .listen(config.PORT,function(){
        console.log("Server started at port : "+config.PORT);
    });
})
