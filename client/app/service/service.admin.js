(function(w){
  var pichubApp=w.pichubApp;

  var SignupService=function($http,$q){
    this.doSignup=function(user){
      var defered=$q.defer();

      $http({
        url:"/api/signup",
        method:"POST",
        data:JSON.stringify(user)
      }).success(function(data,status,config){
        defered.resolve(data);
      }).error(function(data,status,config){
        defered.resolve(data);
      })

      return defered.promose;
    }
  }

  pichubApp.service('signupService',['$http','$q',SignupService]);

})(window);
