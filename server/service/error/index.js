'use strict'

module.exports=function(err,code,callback){
  err.code=code;
  callback(err);
}
