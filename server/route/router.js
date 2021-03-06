'use strict'
/*** All routers defines here ***/
var profileController=require('./../api/controller/controller.profile.js');

var controller=require('./../api/controller/');

module.exports=function(app){
  /***
   * /api/login and /api/signup is pulbic access point
   * no need to check for authorized access
   * as long as the request is from permitted origin
  ***/
  app.use(function(req,res,next){
    if(req.url=='/api/login' || req.url=='/api/signup')
      return next();

    if(req.session && req.session.isAuthenticated)
      return next();

    res.status(302);
    res.redirect('http://localhost:2000');
  })

  /*** Router for api ***/
  app.use('/api',require('./../api/api.routes'));
  app.use('/landing',require('./landing.router.js'));
  app.use('/home',require('./home.route.js'));

  /*** Router for pages ***/
  /*** Landing Page Routers ***/
  app.route('/')
      .get(function(req,res,next){
          res.status(200);
          res.sendFile('index.html',app.get('routePath'));
      });

  app.route('/search')
      .get(function(req,res,next){
        res.status(200);
        res.sendFile('templates/search.html',app.get('routePath'));
      })

  app.use(function(err,req,res,next){
      console.log("Internal Server Error");
      console.log(err.stack);
      res.status(500);
      res.end(JSON.stringify({msg:"Internal Server Error"}));
  })
}
