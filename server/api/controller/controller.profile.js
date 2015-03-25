var ProfileService=require('./../../service/profile/profile.index.js');
var EventEmitter=require('events').EventEmitter;
var profileService=new ProfileService();

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

exports.handleRetreiveUserData=function(req,res,next){
  profileService.retrieveUserParticulars(req.session.userId,function(err,dbUser){
    if(err)
      return next(err);

    res.status(200);
    res.end(JSON.stringify({"particulars":dbUser}));
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
