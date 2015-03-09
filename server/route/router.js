'use strict'
/*** All routers defines here ***/

module.exports=function(app){
  /*** Router for api ***/
  app.use('/api',require('./../api/api.routes'));

  /*** Router for pages ***/
  app.route('/')
      .get(function(req,res,next){
          res.status(200);
          res.sendFile('index.html',app.get('routePath'));
      });

  app.route('/feed')
      .get(function(req,res,next){
        res.status(200);
        res.end('<h3>Photo feeds</h3>')
      })

  app.use(function(err,req,res,next){
      console.log("Internal Server Error");
      console.log(err.stack);
      res.status(500);
      res.end(JSON.stringify({msg:"Internal Server Error"}));
  })
}
