var ProfileService=require('./../../service/profile/profile.index.js');
var EventEmitter=require('events').EventEmitter;
var profileService=new ProfileService();

/*** User profile particulars update ***/
exports.handleProfileUpdate=function(req,res,next){
  var updatedUser=req.body.updatedUser;
  updatedUser.newUser=false;

  if(req.session.uploadFile){
    updatedUser.thumbnail=req.session.uploadFile.path;
    delete req.session.uploadFile;
  }

  profileService.on('bizErr.profile.input',function(msg){
    req.msg=msg;
    next();
  });

  profileService.updateUserProfile(req.body.updatedUser,req.session.userId,
    function(err,dbUser){
      if(err)
        return next(err); //application exception;

      res.status(200);
      res.end(JSON.stringify({msg:"User profile updated successfully"}));
    })
}

/*** Password change ***/
exports.handlePasswordChange=function(req,res,next){
  if(!req.session.curPwd)
    throw new Error("Password hasn't been stored in the session");

  profileService.on('bizErr.profile.input',function(msg){
    req.msg=msg;
    return next();
  })

  profileService.savePasswordChange(req.body.newPwd,req.body.curPwd,req.session.curPwd,req.session.userId,function(err,pwd){
    if(err)
      return next(err);

    res.status(200);
    res.send(JSON.stringify({msg:"Password has been changed successfully."}));
  })
}

/*** this handler method needs another middleware to further processing ***/
exports.handleRetrievePassword=function(req,res,next){
  profileService.getCurrentPassword(req.session.userId,function(err,pwd){
    if(err)
      return next(err);

    req.session.curPwd=pwd;
    return next();
  })
}

exports.handleRetreiveUserData=function(req,res,next){
  profileService.retrieveUserParticulars(req.session.userId,function(err,dbUser){
    if(err)
      return next(err);

    res.status(200);
    res.end(JSON.stringify({"particulars":dbUser}));
  })
}

exports.handleUserProfileSearch=function(req,res,next){
  profileService.searchUserProfile(req.query.keyword,function(err,userList){
    if(err)
      return next(err);

    res.status(200).end(JSON.stringify({foundUsers:userList}));
  })
}

exports.retrieveNewUserFlag=function(req,res,next){
  profileService.isNewUser(req.session.userId,function(err,isNew){
    if(err)
      return next(err);

    res.status(200);
    res.end(JSON.stringify({isNewUser:isNew}));
  })
}

exports.handleAvatorUpload=function(req,res,next){
  req.session.uploadFile=req.files.uploadFile; //store the uploaded avator in the session for temporary
  res.status(200);
  res.end(JSON.stringify({msg:"Avator uploaded successfully"}));
}
