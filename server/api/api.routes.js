var express=require('express');
var controller=require('./controller');
var bizErrHandler=require('./controller/controller.bizerror');
var msg=require('./../config/setting');
var router=express.Router();

router.post('/login',controller.handleLogin);
router.post('/signup',controller.handleSignUp,bizErrHandler.handleSignupBizError);
router.post('/thread/create',controller.checkSession,controller.handleThreadCreation);

module.exports=router;
