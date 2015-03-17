(function(w){
  var pichub=w.pichubApp;

  function FeedController($scope){
    console.log("FeedController");
    $scope.test="Feed"
  }

  pichub.controller('FeedController',['$scope',CommonController]);
})(window);
