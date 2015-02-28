var dateUtil=require('./../util/util.date');

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
