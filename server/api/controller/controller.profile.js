var profileService=require('./../../service/profile');

exports.handlProfileUpdate=function(req,res,next){
  profileService.updateUserProfile(req.body.fullname,req.body.username,req.body,gender,
    req.body.desc,req.body.email,req.body.curPasswd,req.body.newPasswd,req.session.userId,function(err,updatedUser){
      if(err)
        return next(err);

      res.status(302);
      res.redirect('/profile');
    })
}
