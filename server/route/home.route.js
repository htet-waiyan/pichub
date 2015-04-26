var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
  console.log("Trace : getting home page");
  res.status(200);
  res.sendFile('templates/home/index.html',global.routePath);
});

router.get('/feed',function(req,res,next){
  console.log("Trace : getting feed page feed.html");
  res.status(200);
  res.sendFile('templates/home/feed.html',global.routePath);
})

module.exports=router;
