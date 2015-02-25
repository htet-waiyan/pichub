'user strict'

var util=require('util');
var MongoClient=require('mongodb').MongoClient;
var CommonDB=require('./db.common');

var error=require('./../../config/setting').ERROR;
var _user="user";

function UserDB(){
  this.colOption={w:1,strict:true};
  this.colName="user";
  //CommonDB.call(this,colOption,colName);
}

/*** Inheirts from CommonDB getting common methods ***/
util.inherits(UserDB,CommonDB);

UserDB.prototype.getUserByEmailPasswd=function(email,passwd,callback){
  console.log("Trace : getUserByEmailPasswd");
  this.getCollection(function(err,col){
    if(err){
      err.code=error.col_err;
      return callback(err,null);
    }

    col.find({email:email,passwd:passwd}).toArray(function(err,docs){
      if(err){
        err.code=error.col_not_found;
        return callback(err,null);
      }
      console.log(docs[0].email+" "+docs[0].passwd);
      return callback(null,docs[0]);
    })
  })
}

UserDB.prototype.createUser=function(user,callback){
  console.log("Trace : UserDB.createUser");
  this.insert(user,{w:1},function(err,dbUser){
    if(err){
      err.code=error.insert_err;
      return callback(err,null);
    }
    return callback(null,dbUser);
  });
}

module.exports=UserDB;
