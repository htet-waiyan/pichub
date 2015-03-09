var dateUtil=require('./../util/util.date');
var uploadPath=require('./../config/setting').UPLOAD_PATH;

exports.initUser=function(_fullname,_email,_passwd){
  return{
    fullname:_fullname,
    thumbnail:null,
    credentials:{
      email:_email,
      passwd:_passwd, //encrypt the passwd
    },
    reg_date:dateUtil.todayAsString(),
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
