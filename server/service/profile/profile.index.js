var UserDB=require('./../db/db.user');
var error=require('./../../config/setting').err;
var userDB=new UserDB();
var _=require('lodash');
var EventEmitter=require('events').EventEmitter;
var util=require('util');

function ProfileService(){EventEmitter.call(this);}

util.inherits(ProfileService,EventEmitter);

ProfileService.prototype.updateUserProfile=function(updatedUser,userId,callback){
  if(!validate.call(this,updatedUser)) // validation failed;
    return;

  userDB.getUserById(userId,function(err,dbUser){
    if(err)
      return callback(err,null);

    if(compareValue(updatedUser,dbUser))
      return callback(null,dbUser);

    userDB.updateUser(updatedUser,userId,function(err,user){ // check duplication for email and username
      return callback(err,user);
    })
  })

  return true;
}

ProfileService.prototype.retrieveUserParticulars=function(userId,callback){
  userDB.getUserById(userId,function(err,dbUser){
    return callback(err,dbUser);
  });
}

ProfileService.prototype.isNewUser=function(userId,callback){
  userDB.getNewUserField(userId,function(err,flag){
    return callback(err,flag);
  })
}

/*** Helper functions ***/
function compareValue(updatedUser,dbUser){
  if(updatedUser.fullname==dbUser.fullname && updatedUser.username==dbUser.username && updatedUser.gender==dbUser.gender
    && updatedUser.desc==dbUser.desc && updatedUser.credentials.email==dbUser.credentials.email)
    return true;

  return false;
}

function checkCurrentPassword(curPassword,userId,callback){
  userDB.getCurrentPassword(userId,function(err,passwd){
    if(err)
      return callback(err,null);

    return curPassword==passwd;
  })
}

/*** this function will be called with a corresponding context value - this ***/
function validate(updatedUser){
  /*** validate emptiness ***/
  if(!updatedUser.fullname){
    this.emit('bizErr.profile.input',{errMsg:"Fullname is required."});
    return false;
  }
  if(!updatedUser.username){
    this.emit('bizErr.profile.input',{errMsg:"Username is required."});
    return false;
  }
  if(!updatedUser.gender){
    this.emit('bizErr.profile.input',{errMsg:"Gender is required."});
    return false;
  }
  if(!updatedUser.email){
    this.emit('bizErr.profile.input',{errMsg:"Email is required."});
    return false;
  }

  /*** verifiy format ***/
  if(updatedUser.desc && updatedUser.desc.length>150){
    this.emit('bizErr.profile.input',{errMsg:"Description must not be more than 150 characters"});
    return false;
  }
  return true;
}

module.exports=ProfileService;
