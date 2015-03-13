var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectID;
var db=require('./../../config/setting').DB;
var error=require('./../../config/setting').ERROR;

var _connection=db.connection;

function CommonDB(){}

var connect=function(callback){
  console.log("Trace : connect");
  console.log("Connection String : "+_connection);
  MongoClient.connect(_connection,{uri_decode_auth:true},function(err,db){
    if(err){
      err.code=error.conn_err;
      return callback(err,null);
    }

    return callback(null,db);
  });
}

CommonDB.prototype.getCollection=function(callback){
  console.log("Trace : getCollection");
  var option=this.colOption;
  var colName=this.colName;

  /*** Connecting MongoDB Server ***/
  connect(function(err,db){
    if(err)
      return callback(err,null,null);

    /*** Getting collection with given name ***/
    db.collection(colName,option,function(err,col){
    if(err){
      err.code=error.col_err;
      dbclose(db,"getCollection");
      return callback(err,null,null);
    }

    return callback(null,col,db);
    })
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
        err.code=error.insert_err;
        dbclose(db,"insert");
        return callback(err,null,null,null);
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
      if(err){
        db.close(); //force to close db connection
        err.code=error.upsert_err;
        return callback(err,null,null,null);
      }

      return callback(null,dbData,db,col);
    });
  })
}

CommonDB.prototype.find=function(id,callback){
  console.log("Trace : CommonDB.find");
  this.getCollection(function(err,col,db){
    if(err){
      err.code=error.col_err;
      return callback(err,null.null,null);
    }

    col.find({_id:ObjectId(id)}).toArray(function(err,docs){
      if(err){
        err.code=error.col_not_found;
        return callback(err,null,null,null);
      }

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

    console.log("Completed creating index for "+field);
  })
}

CommonDB.prototype.close=function(db){
  db.close();
}

module.exports=CommonDB;
