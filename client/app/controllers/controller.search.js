(function(w){
  var pichub=w.pichubApp;

  function SearchController($profileService,$scope,$stateParams){
    (function(){
      $profileService.searchProfile($stateParams.keyword)
          .then(function(results){
            $scope.resultList=results.foundUsers;
            console.log(results);
          },function(err){
            //error occured.
          })
    })()
  }

  pichub.controller('SearchController',['ProfileService','$scope','$stateParams',SearchController]);
})(window)
