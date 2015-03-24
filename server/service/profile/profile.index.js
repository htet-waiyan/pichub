var UserDB=require('./../db/db.user');
var error=require('./../../config/setting').err;
var userDB=new UserDB();
var _=require('lodash');
var EventEmitter=require('events').EventEmitter;
var emitter=new EventEmitter();

exports.updateUserProfile=function(updatedUser,userId,callback){
  userDB.getUserById(userId,function(err,dbUser){
    if(err)
      return callback(err,null);

    if(compareValue(updatedUser,dbUser))
      return callback(null,dbUser);

    userDB.updateUser(updatedUser,userId,function(err,user){
      return callback(err,user);
    })
  })

  return true;
}

exports.retrieveUserParticulars=function(userId,callback){
  userDB.getUserById(userId,function(err,dbUser){
    return callback(err,dbUser);
  });
}

exports.isNewUser=function(userId,callback){
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
