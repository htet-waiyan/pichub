'use strict'

var instance;

function DBConnectionFactory(_db){
  var dbInstance=_db;
  this.getDBInstance=function(){
    return dbInstance;
  }
}

exports.init=function(_db){
  console.log("DB.ConFactory : init");
  instance=new DBConnectionFactory(_db);
}

exports.getDBConFactory=function(){
  console.log("DB.ConFactory : getDBInstance");
  if(instance==null)
    throw new Error('Database instance has not been instantiated');

  return instance;
}
