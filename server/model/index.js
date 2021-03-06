var dateUtil=require('./../util/util.date');
var uploadPath=require('./../config/setting').UPLOAD_PATH;

exports.initUser=function(_username,_email,_passwd){
  return{
    username:_username,
    thumbnail:null,
    credentials:{
      email:_email,
      passwd:_passwd, //encrypt the passwd
    },
    reg_date:dateUtil.todayAsString(),
    newUser:true
  }
}

exports.initThread=function(_name,_desc,_mode,_ownerId){
  return{
    name:_name,
    desc:_desc,
    mode:_mode,
    owner:{
      id:_ownerId,
      datetime:dateUtil.todayAsString()
    }
  }
}

exports.initPhoto=function(_filename,_caption,threadId,threadName){
  return{
    filename:_filename,
    path:uploadPath,
    caption:_caption,
    generated_fname:"",
    uploadTime:"",
    likes:0,
    threadIn:{
      id:threadId,
      name:threadName
    }
  }
}
