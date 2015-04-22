exports.handleSignupBizError=function(req,res,next){
	console.log("Trace : handleSignupBizError");
	var returnMsg={};
	if(req.dupUsername)
		returnMsg.msg="Username is not available. Try different one"

	else if(req.dupEmail)
		returnMsg.msg="A user is already registered with this email"

	else if(req.inputErr)
		returnMsg.msg=req.inputErr.errMsg;

	res.status(406);
	res.end(JSON.stringify(returnMsg));
}

exports.handleProfileEditError=function(req,res,next){
	console.log("Trace : handleProfileEditError");
	res.status(406);
	res.end(JSON.stringify(req.msg));
}
