(function(w){
  var pichub=w.pichubApp;

  function CommonController($scope){
  	$scope.test="hello";
  }

  pichub.controller('CommonController',['$scope',CommonController]);
})(window);
