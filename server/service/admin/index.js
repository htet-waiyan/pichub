var UserDB=require('./../db/db.user');
var error=require('./../../config/setting').err;
var userDB=new UserDB();

exports.authenLogin=function(email,passwd,callback){
  console.log("Trace : authenLogin");
  console.log("Email : "+email+" Password : "+passwd);
  userDB.getUserByEmailPasswd(email,passwd,callback);
}

exports.signUpUser=function(user,callback){
  console.log("Trace : signUpUser");
  userDB.createUser(user,function(err,dbUser){
    callback(err,dbUser);
  });
}
