var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    console.log("Getting Landing Page");
    res.status(200);
    res.sendFile('templates/landing/landing.html',global.routePath);
 });

module.exports=router;