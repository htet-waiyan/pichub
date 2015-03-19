'use strict'
/*** All routers defines here ***/

var controller=require('./../api/controller/');

module.exports=function(app){
  /*** Router for api ***/
  app.use('/api',require('./../api/api.routes'));

  /*** Router for pages ***/
  app.route('/')
      .get(controller.checkLogin,function(req,res,next){
          res.status(200);
          res.sendFile('index.html',app.get('routePath'));
      });

  app.route('/feed')
      .get(controller.checkSession,function(req,res,next){
        res.status(200);
        res.sendFile('main.html',app.get('routePath'));
      });

  app.route('/feed/content')
      .get(controller.checkSession,function(req,res,next){
        res.status(200);
        res.sendFile('templates/feed/feed.html',app.get('routePath'));
      });

  app.route('/profile/content')
      .get(function(req,res,next){
        res.status(200);
        res.sendFile('templates/profile/content.html',app.get('routePath'));
      });

  app.route('/profile/edit')
      .get(function(req,res,next){
        res.status(200);
        res.sendFile('templates/profile/edit.html',app.get('routePath'));
      });

  app.use(function(err,req,res,next){
      console.log("Internal Server Error");
      console.log(err.stack);
      res.status(500);
      res.end(JSON.stringify({msg:"Internal Server Error"}));
  })
}
