var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectID;
var error=require('./../../config/setting').ERROR;
var handleError=require('./../error/');
var dbConnecitonFactory=require('./db.confactory').getDBConFactory();

var db=dbConnecitonFactory.getDBInstance();

function CommonDB(){}

CommonDB.prototype.getCollection=function(callback){
  console.log("Trace : getCollection");
  var option=this.colOption;
  var colName=this.colName;

  /*** Getting collection with given name ***/
  db.collection(colName,option,function(err,col){
    if(err)
      return handleError(err,error.col_err,callback);

    return callback(null,col,db);
  })
}

CommonDB.prototype.insert=function(data,option,callback){
  console.log("Trace : CommonDB.insert");
  var _option=option||this.colOption;
  var colName=this.colName;

  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null,null,null);

    col.insert(data,_option,function(err,result){
      if(err){
        console.log(err.code);
        console.log(err);
        return handleError(err,error.insert_err,callback);
      }

      return callback(null,result[0],db,col);
    })
  });
}

CommonDB.prototype.update=function(updatedData,option,callback){
  console.log("Trace : CommonDb.update");

  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null,null,null);

    col.update({"_id":ObjectId(updateData._id)},{"$set":updatedData},option,function(err,dbData){
      if(err)
        return handleError(err,error.upsert_err,callback);

      return callback(null,dbData,db,col);
    });
  })
}

CommonDB.prototype.find=function(id,callback){
  console.log("Trace : CommonDB.find");
  this.getCollection(function(err,col,db){
    if(err)
      return callback(err,null.null,null);

    col.find({_id:ObjectId(id)}).toArray(function(err,docs){
      if(err)
        return handleError(err,error.col_not_found,callback);

      return callback(null,docs[0],db,col);
    })
  })
}

/*** indexName is optional ***/
CommonDB.prototype.createIndex=function(db,col,fields,indexName){
  console.log("Trace : CommonDB.createIndex");
  col.createIndex(fields,{unique:true,background:true,name:indexName,},function(err,result){
    if(err)
      throw err;

    console.log("Completed creating index for "+fields);
  })
}

module.exports=CommonDB;
