var UserDB=require('./../db/db.user');
var ThreadDB=require('./../db/db.thread');
var _=require('lodash');

var userDB=new UserDB();
var threadDB=new ThreadDB();

exports.createThread=function(_userId,thread,callback){
	threadDB.createThread(thread,function(err,thread){
		if(err)
			return callback(err,null,null);

		/*** update the user ***/
		userDB.findById(_userId,function(err,dbUser){
			if(err)
				return callback(err,null,null);

			/*** this user has thread either subscribed or owned ***/
			if(dbUser.thread){
				var threadOwned=dbUser.thread.threadOwned||[];
				threadOwned.push(thread);
				dbUser.thread.threadOwned=threadOwned;

				userDB.updateUser(dbUser,function(err,updatedUser){
					if(err)
						return callback(err,null,null);

					return callback(null,updatedUser,thread);
				})
			}
		})
	})
};
