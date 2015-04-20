var path=require('path');
var bodyParser=require('body-parser');
var express=require('express');
var _secret=require('./secret').secret;

var cookieParser=require('cookie-parser');
var session=require('express-session');
var multer=require('multer');
var uploadPath=require('./setting').UPLOAD_PATH_UNIX;

module.exports=function(app){
  var absPath=function(){
    return path.normalize(__dirname+'/../..');
  }();

  var routePath={
    root:path.join(absPath,'/client/view')
  };

  global.routePath=routePath;
  app.set('routePath',routePath);
  app.set('root',absPath);

  /*** middleware configuration ***/
  /*** cookies and session middlewares ***/
  //app.use(cookieParser());
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
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(multer({
    dest:uploadPath.avator,
    rename:function(fieldname,filename){
      return filename+"_avator";
    },
    onFileUploadComplete:function(file,req,res){
      console.log(file.originalname+" has been uploaded successfully");
    }
  }));

  /*** serve static file - js/css/image  ***/
  app.use(express.static(path.join(absPath,'/bower_components')));
  app.use(express.static(path.join(absPath,'/client')));

  return{
    PORT:process.env.PORT||3000
  }
}
