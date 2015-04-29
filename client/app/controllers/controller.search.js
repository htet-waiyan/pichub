(function(w){
  var pichub=w.pichubApp;

  function SearchController($scope,results){
    /*(function(){
      $profileService.searchProfile($stateParams.keyword)
          .then(function(results){
            $scope.resultList=results.foundUsers;
            console.log(results);
          },function(err){
            //error occured.
          })
    })()*/
    console.log(results.foundUsers[0]);
    $scope.resultList=results.foundUsers;
  }

  pichub.controller('SearchController',['$scope','results',SearchController]);
})(window)
