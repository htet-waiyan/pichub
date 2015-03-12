var path=require('path');
var bodyParser=require('body-parser');
var express=require('express');
var _secret=require('./secret').secret;

var cookieParser=require('cookie-parser');
var session=require('express-session');

module.exports=function(app){
  var absPath=function(){
    return path.normalize(__dirname+'/../..');
  }();

  var routePath={
    root:path.join(absPath,'/client/view')
  };

  app.set('routePath',routePath);
  app.set('root',absPath);

  /*** middleware configuration ***/
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  /*** cookies and session middlewares ***/
  app.use(cookieParser());
  app.use(session({
    secret:_secret,
    name:"jssession_pichub",
    resave:true,
    saveUninitialized:false,
    cookie:{
      path:'/',
      secure:false
    }
  }));

  /*** serve static file - js/css/image  ***/
  app.use(express.static(path.join(absPath,'/bower_components')));
  app.use(express.static(path.join(absPath,'/client')));

  return{
    PORT:process.env.PORT||3000
  }
}
