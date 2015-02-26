(function(w){
  var pichubApp=w.pichubApp;

  var SignupController=function($scope,$signupService){
    $scope.formData={};
    this.submit=function(){
      $signupService.doSignup($scope.formData)
        .then(function(user){
          //do something with user
        },function(err){
          //do something with error
        })
    }
  }

  pichubApp.controller('signupCtrl',['$scope','signupService',SignupController]);
})(window);
