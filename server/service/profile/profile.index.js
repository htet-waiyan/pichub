var UserDB=require('./../db/db.user');
var error=require('./../../config/setting').err;
var userDB=new UserDB();
var _=require('lodash');

export.updateUserProfile=function(fullname,username,gender,desc,email,curPasswd,newPasswd,userId,callback){
  checkCurrentPassword(curPasswd,userId,function(err,flag){
    if(err)
      return callback(err,null);

    if(flag)
      return callback(null,null);

    /*** current password is same as password defined ***/
    userDB.findById(userId,function(err,dbUser){
      if(err)
        return callback(err,null);
    })
  })
}

/*** Helper functions ***/
function compareValue(updatedUser,dbUser){
  if(updatedUser.fullname==dbUser.fullname && updatedUser.username==dbUser.username && updatedUser.gender==dbUser.gender
    && updatedUser.desc==dbUser.desc && updatedUser.email=dbUser.credentials.email &&
    updatedUser.password==dbUser.credentials.passwd)
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
