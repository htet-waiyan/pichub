(function(w){
  var pichubApp=w.pichubApp;

  var SignupController=function($scope,$window,$adminService){
    $scope.formData={};
    this.submit=function(){
      $adminService.doSignup($scope.formData)
        .then(function(resp){
          //do something with user
          $scope.successMsg=resp.msg;
        },function(err){
          //do something with error
          $scope.errMsg=err.msg;
        })
    }
  }

  var LoginController=function($rootScope,$scope,$window,$adminService){
    $scope.formData={};

    this.submit=function(){
      $adminService.doLogin($scope.formData)
        .then(function(user){
          console.log("Login Successsful");
          $window.location.href="/feed";
        },function(err){
          console.log("Login failed");
          $scope.errMsg=err.msg;
        })
    }
  }

  pichubApp.controller('SignupCtrl',['$scope','$window','adminService',SignupController]);
  pichubApp.controller('LoginCtrl',['$rootScope','$scope','$window','adminService',LoginController]);
})(window);
