'use strict'

var util=require('util');
var CommonDB=require('./db.common');
var error=require('./../../config/setting').ERROR;

function ThreadDB(){
  this.colOption={w:1,strict:true};
  this.colName="thread";
}

/*** Inherits from CommonDB ***/
util.inherits(ThreadDB,CommonDB);

ThreadDB.prototype.createThread=function(thread,callback){
  console.log("Trace : createThread");
  this.insert(thread,{w:1},function(err,dbThread){
    if(err){
      err.code=error.insert_err;
      return callback(err,null);
    }

    return callback(null,dbThread);
  })
}

module.exports=ThreadDB;
