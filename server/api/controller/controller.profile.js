var profileService=require('./../../service/profile/profile.index.js');

exports.handleProfileUpdate=function(req,res,next){
  /*profileService.updateUserProfile(req.body.fullname,req.body.username,req.body,gender,
    req.body.desc,req.body.email,req.body.curPasswd,req.body.newPasswd,req.session.userId,function(err,updatedUser){
      if(err)
        return next(err);

      res.status(302);
      res.redirect('/profile');
    })*/
	profileService.getCurrentPassword(req.session.userId,function(err,passwd){
		if(err)
			throw err;

		res.status(200);
		res.end(JSON.stringify({"password":passwd}));
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
