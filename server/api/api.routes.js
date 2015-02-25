var express=require('express');
var controller=require('./controller');
var msg=require('./../config/setting');
var router=express.Router();

router.post('/login',controller.handleLogin);
router.post('/signup',controller.handleSignUp);

module.exports=router;
