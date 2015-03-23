var UserDB=require('./../db/db.user');
var error=require('./../../config/setting').err;
var userDB=new UserDB();
var _=require('lodash');

exports.updateUserProfile=function(fullname,username,gender,desc,email,curPasswd,newPasswd,userId,callback){
  checkCurrentPassword(curPasswd,userId,function(err,flag){
    if(err)
      return callback(err,null);

    if(flag) // current password not same as the one in db
      return callback(null,null);

    /*** current password is same as password defined ***/
    userDB.getUserById(userId,function(err,dbUser){
      if(err)
        return callback(err,null);

      var updatedUser=createUserVjo(fullname,username,gender,desc,email,newPasswd);
      if(compareValue(updatedUser,dbUser)) //all values haven't changed. no need to do update
        return callback(null,dbUser);

      userDB.updateUser(updatedUser,function(err,user){
        return callback(err,user);
      })
    })
  })
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
    && updatedUser.desc==dbUser.desc && updatedUser.email==dbUser.credentials.email &&
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

function createUserVjo(_fullname,_username,_gender,_desc,_email,_newPasswd){
  return{
    fullname:_fullname,
    username:_username,
    gender:_gender,
    desc:_desc,
    email:_email,
    passwd:_newPasswd
  }
}
