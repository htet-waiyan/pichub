var UserDB=require('./../db/db.user');
var error=require('./../../config/setting').err;
var userDB=new UserDB();
var util=require('util');
var EventEmitter=require('events').EventEmitter;
var isValidEmail=require('./../../util/validator').isValidEmail;
var isValidUsername=require('./../../util/validator').isValidUsername;

function Admin(){};

util.inherits(Admin,EventEmitter);

Admin.prototype.authenLogin=function(email,passwd,callback){
  console.log("Trace : authenLogin");
  console.log("Email : "+email+" Password : "+passwd);
  userDB.getUserByEmailPasswd(email,passwd,callback);
}

Admin.prototype.signUpUser=function(user,callback){
  console.log("Trace : signUpUser");
  if(!checkValidUsernameEmail.call(this,user.credentials.email,user.username))
    return false;

  userDB.createUser(user,function(err,dbUser){
  	if(err && err.code==11000)
  		return checkDuplicateUsernameEmail(err,callback);

    callback(err,dbUser,false,false);
  });
}

function checkValidUsernameEmail(email,username){
  if(!isValidEmail(email)){
    this.emit('bizErr.signup.input',{errMsg:'Email is invalid'});
    return false;
  }

  if(!isValidUsername(username)){
    this.emit('bizErr.signup.input',{errMsg:'Username is invalid'});
    return false;
  }

  return true;
}

function checkDuplicateUsernameEmail(error,callback){
  console.log("Trace : checkDuplicateUsernameEmail");
	var index=require('./../../config/setting').DB.index;
	var usernameIdx=error.errmsg.match(index.unique_username);
	var emailIdx=error.errmsg.match(index.unique_email);

  var dupUsername=dupEmail=false;

	if(usernameIdx && usernameIdx[0]){
		dupUsername=true;
    error=null; //not internal server. just business error;
  }

	if(emailIdx && emailIdx[0]){
		dupEmail=true;
    error=null; //not internal server. just business error;
  }

  /*** verification purpose ***/
  console.log("Duplicate username :"+dupUsername);
  console.log("Duplicate email :"+dupEmail);

  callback(null,null,dupUsername,dupEmail);
}

module.exports=Admin; //expose Admin instance;
