var express=require('express');
var controller=require('./controller');
var profileController=require('./controller/controller.profile.js');
var bizErrHandler=require('./controller/controller.bizerror');
var msg=require('./../config/setting');
var router=express.Router();

router.get('/cookies',controller.handleCookiesRequest);
router.post('/login',controller.handleLogin);
router.post('/signup',controller.handleSignUp,bizErrHandler.handleSignupBizError);

router.post('/thread/create',controller.checkSession,controller.handleThreadCreation);

router.get('/profile/search',profileController.handleUserProfileSearch);
router.get('/profile/newUser',profileController.retrieveNewUserFlag);
router.get('/profile/userdata',profileController.handleRetreiveUserData);
router.post('/profile/edit/save',profileController.handleProfileUpdate,bizErrHandler.handleProfileEditError);
router.post('/profile/avator/upload',profileController.handleAvatorUpload);
router.post('/profile/password/save',profileController.handlePasswordChange,bizErrHandler.handleProfileEditError);

module.exports=router;
