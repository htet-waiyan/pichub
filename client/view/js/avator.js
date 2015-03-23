$(function(){
  $(document).on('change','#avatarUploader',function(e){
    var file=this.files[0];

    var formData=new FormData();
    formData.append('uploadFile',file);

    $.ajax('/api/profile/avator/upload',{
      method:"POST",
      data:formData,
      processData:false,
      contentType:false,
      success:function(data,status){console.log("File upload succeed");},
      error:function(xhr,data,status){console.log("File upload failed");}
    })
  })
})
