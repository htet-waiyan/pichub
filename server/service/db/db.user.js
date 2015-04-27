'user strict'

var util=require('util');
var MongoClient=require('mongodb').MongoClient;
var CommonDB=require('./db.common');
var ObjectId=require('mongodb').ObjectID;

var index=require('./../../config/setting').DB.index;
var _user="user";

var _uniqueUsernameIdx="username_unique_idx";
var _uniqueEmailIdx="email_unique_idx";

function UserDB(){
  this.colOption={w:1,strict:true};
  this.colName="user";
}

/*** Inheirts from CommonDB getting common methods ***/
util.inherits(UserDB,CommonDB);

UserDB.prototype.getUserByEmailPasswd=function(email,passwd,callback){
  console.log("Trace : getUserByEmailPasswd");
  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null);

    col.find({credentials:{email:email,passwd:passwd}}).toArray(function(err,docs){
      if(err)
        return callback(err,null);

      return callback(null,docs[0]);
    })
  })
}

UserDB.prototype.getUserByNameIdPartial=function(keyword,callback){
  console.log("Trace : UserDB.getUserByNameIdPartial");
  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null);

    col.find({$or:[{username:{$regex:keyword,$options:'i'}},{fullname:{$regex:keyword,$options:'i'}}]},
            {username:1,fullname:1})
              .toArray(function(err,userList){
                if(err)
                  return callback(err,null);

                return callback(null,userList);
              })
  })
}

UserDB.prototype.getCurrentPassword=function(userId,callback){
  console.log("Trace : UserDB.getCurrentPassword");
  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null);

    var cursor=col.find({_id:new ObjectId(userId)},{credentials:1});
    cursor.toArray(function(err,arr){
      if(err)
        return callback(err,null);

      return callback(null,arr[0].credentials.passwd);
    })
  })
}

UserDB.prototype.savePasswordChange=function(userId,newPwd,callback){
  var updatedData={'credentials.passwd':newPwd};
  this.update(updatedData,userId,{w:1},function(err,pwd){
    return callback(err,pwd);
  })
}

UserDB.prototype.getUserById=function(id,callback){
  console.log("Trace : UserDB.findById");
  this.find(id,function(err,dbUser,db,col){
    if(err)
      return callback(err,null);

    return callback(null,dbUser);
  })
}

UserDB.prototype.getNewUserField=function(_userId,callback){
  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null);

    col.find({"_id":new ObjectId(_userId)},{"newUser":1,"_id":0})
        .toArray(function(err,doc){
          if(err)
            return callback(err,null);

          console.log(_userId);
          return callback(null,doc[0].newUser);
        })
  })
}

UserDB.prototype.createUser=function(user,callback){
  console.log("Trace : UserDB.createUser");
  var createIndex=this.createIndex;
  this.insert(user,{w:1},function(err,dbUser,db,col){
    if(err){
      console.log(typeof err.code);
      console.log(err.code);
      return callback(err,null);
    }

    createIndex(db,col,{"username":1},index.unique_username);
    createIndex(db,col,{"credentials.email":1},index.unique_email);
    return callback(null,dbUser);
  });
}

UserDB.prototype.updateUser=function(updatedUser,_userId,callback){
  console.log("Trace : UserDB.updateUser");
  this.update(updatedUser,_userId,{w:1},function(err,dbUser){
    if(err)
      return callback(err,null);

    return callback(null,dbUser);
  })
}

module.exports=UserDB;
