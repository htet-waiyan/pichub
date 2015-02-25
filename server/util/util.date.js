exports.toStringFromDate=function(date,format){
  var _format=format||'dd/MM/yyyy';

  /*** Implements formatting functionality ***/
  return date.getDate()+'/'+date.getMonth()+'/'+getFullYear();
}

exports.todayAsString=function(format){
  var d=new Date(); //get today date
  return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
}
