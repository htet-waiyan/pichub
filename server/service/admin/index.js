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
  	if(err && err.code==11000)
  		return checkDuplicateUsernameEmail(err,callback);

    callback(err,dbUser,false,false);
  });
}

function checkDuplicateUsernameEmail(error,callback){
  console.log("Trace : checkDuplicateUsernameEmail");
	var index=require('./../../config/setting').DB.index;
	var usernameIdx=error.err.match(index.unique_username);
	var emailIdx=error.err.match(index.unique_email);

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
