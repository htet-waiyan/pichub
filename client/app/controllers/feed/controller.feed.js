(function(w){
  var pichub=w.pichubApp;

  function FeedController($rootScope,$scope,$location,$profileService){
    $profileService.isNewUser()
        .then(function(flag){
          if(flag.isNewUser)
            $location.path('/profile/edit');
        },function(err){
          //redirect to 500 page
        })

    console.log("FeedController");
    $scope.test="Feed"
  }

  pichub.controller('FeedController',['$rootScope','$scope','$location','ProfileService',FeedController]);
})(window);
