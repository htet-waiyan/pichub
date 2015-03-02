var UserDB=require('./../db/db.user');
var ThreadDB=require('./../db/db.thread');
var _=require('lodash');
var dateUtil=require('./../../util/util.date');

var userDB=new UserDB();
var threadDB=new ThreadDB();

exports.createThread=function(thread,callback){
	threadDB.createThread(thread,function(err,dbThread){
		if(err)
			return callback(err,null,null);

		return callback(null,dbThread);
	})
};
