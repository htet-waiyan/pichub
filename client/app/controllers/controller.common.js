(function(w){
  var pichub=w.pichubApp;

  function CommonController($rootScope,$scope,$state){
  	this.searchProfile=function($e){
      if($e.keyCode!=13)
        return;

      /*$profileService.searchProfile($scope.keyword)
          .then(function(results){
            $scope.resultList=results;
            console.log(results);
          },function(err){
            //error occured.
          })*/
      $rootScope.keyword=$scope.keyword;
      $state.go('search',{keyword:$scope.keyword});
    }
  }

  pichub.controller('CommonController',['$rootScope','$scope','$state',CommonController]);
})(window);
