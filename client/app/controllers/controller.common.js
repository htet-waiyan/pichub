(function(w){
  var pichub=w.pichubApp;

  function CommonController($scope,$profileService){
  	this.searchProfile=function($e){
      if($e.keyCode!=13)
        return;

      $profileService.searchProfile($scope.keyword)
          .then(function(results){
            $scope.resultList=results;
            console.log(results);
          },function(err){
            //error occured.
          })
    }
  }

  pichub.controller('CommonController',['$scope','ProfileService',CommonController]);
})(window);
