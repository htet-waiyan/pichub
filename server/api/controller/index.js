var admin=require('./../../service/admin/');
var thread=require('./../../service/thread');
var model=require('./../../model/');

exports.handleLogin=function(req,res,next){
  console.log("Trace : handleLogin");
  admin.authenLogin(req.body.email,req.body.passwd,function(err,user){
    /*** db error. return 500 internal server error ***/
    if(!err && err.code<=10001 && err.code>=10004)
      return next(err);

    /*** user not found. authentication failed ***/
    if(!user){
      res.status=403;
      res.end(JSON.stringify({msg:"Email and password is incorrect."}));
    }
    /*** user found. authentication succeed. redirect to feed ***/
    else{
      res.status=200;
      res.end(JSON.stringify({msg:"Authentication succeed.",code:200}))
    }
  })
}

exports.handleSignUp=function(req,res,next){
  console.log("Trace : handleSingup");
  var user=model.initUser(req.body.fullname,req.body.email,req.body.passwd);
  admin.signUpUser(user,function(err,dbUser){
    if(err && err.code>=10001 && err.code<=10004){
      return next(err);
    }

    res.status(200);
    res.end(JSON.stringify(dbUser));
  })
}

exports.handleThreadCreation=function(req,res,next){
  console.log("Trace : handleThreadCreation");
  var threadCreated=model.initThread(req.body.name,req.body.desc,req.body.mode,"54e71c68e269c456996474f7");
  thread.createThread(threadCreated,function(err,thread){
    if(err && err.code>=10001 && err.code<=10004){
      return next(err);
    }

    res.status(200);
    res.end(JSON.stringify(thread));
  })
}
