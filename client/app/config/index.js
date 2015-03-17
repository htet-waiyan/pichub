(function(w){
  var pichub=w.pichubApp;

  pichub.config(function($routeProvider){
    $routeProvider.when('/feed',{
      templateUrl:'/feed/content',
      controller:'FeedController',
      controllerAs:'feedCtrl'
    }).when('/profile',{
      templateUrl:'/profile/content',
      controller:'ProfileContentController',
      controllerAs:'pcCtrl'
    }).when('/edit',{
      templateUrl:'/profile/edit',
      controller:'ProfileEditController',
      controllerAs:'peCtrl'
    })
  })
})(window)
