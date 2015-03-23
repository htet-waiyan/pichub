var admin=require('./../../service/admin/');
var profileService=require('./../../service/profile/profile.index.js');
var thread=require('./../../service/thread');
var model=require('./../../model/');

/*** Security And Authorization Implementation ***/
exports.checkSession=function(req,res,next){
  console.log("controller : checkSession");
  if(req.session && req.session.isAuthenticated)
    return next();

  console.log("User isn't authenticated yet. Redirect to login");
  res.redirect('/');
}

exports.checkLogin=function(req,res,next){
  console.log("controller : checkLogin");
  /** user hasn't been authenticated. redirect to home page **/
  if(!req.session.isAuthenticated)
    return next();

  res.redirect('/feed');
}

exports.secureAccess=function(req,res,next){
  if(!req.session.isAuthenticated)
    return next();

  res.status(403);
  res.end(JSON.stringify({msg:"Unathorized Access"}));
}

/*** End of Security and Authorization Implementation ***/

exports.handleLogin=function(req,res,next){
  console.log("Trace : handleLogin");
  console.log(JSON.stringify(req.body));
  admin.authenLogin(req.body.email,req.body.passwd,function(err,user){
    /*** db error. return 500 internal server error ***/
    if(err)
      return next(err);

    /*** user not found. authentication failed ***/
    if(!user){
      res.status(403);
      res.end(JSON.stringify({msg:"Email or password is incorrect."}));
    }
    /*** user found. authentication succeed. redirect to feed ***/
    else{
      req.session.isAuthenticated=true;
      req.session.userId=user._id;

      res.status(200);
      res.end(JSON.stringify(user));
    }
  })
}

exports.handleSignUp=function(req,res,next){
  console.log("Trace : handleSingup");
  var user=model.initUser(req.body.username,req.body.email,req.body.passwd);
  admin.signUpUser(user,function(err,dbUser,dupUsername,dupEmail){
    if(err){
      return next(err);
    }

    if(dupUsername || dupEmail){
      req.dupUsername=dupUsername;req.dupEmail=dupEmail;
      return next();
    }

    res.status(200);
    res.end(JSON.stringify({msg:"Registered successfully! Please login."}));
  })
}

exports.handleThreadCreation=function(req,res,next){
  console.log("Trace : handleThreadCreation");
  var threadCreated=model.initThread(req.body.name,req.body.desc,req.body.mode,"54e71c68e269c456996474f7"); //userid should come from session
  thread.createThread(threadCreated,function(err,thread){
    if(err){
      return next(err);
    }

    res.status(200);
    res.end(JSON.stringify(thread));
  })
}

exports.handlePhotoUpload=function(req,res,next){
  console.log("Trace : handleThreadCreation");
  var photoUpload=model.initPhoto("",req.body.caption,req.body.threadId,req.body.threadName);
}

/*** helper middlewares **/

