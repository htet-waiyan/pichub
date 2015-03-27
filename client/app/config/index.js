(function(w){
  var pichub=w.pichubApp;

  pichub.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
      templateUrl:'/landing',
      controller:'HomeController',
      controllerAs:'hmCtrl'
    }).when('/login',{
      templateUrl:'/landing/login',
      controller:'AdminController',
      controllerAs:'adminCtrl'
    }).when('/signup',{
      templateUrl:'/landing/signup',
      controller:'AdminController',
      controllerAs:'adminCtrl'
    }).when('/feed',{
      templateUrl:'/feed/content',
      controller:'FeedController',
      controllerAs:'feedCtrl'
    }).when('/profile',{
      templateUrl:'/profile/content',
      controller:'ProfileContentController',
      controllerAs:'pcCtrl'
    }).when('/profile/edit',{
      templateUrl:'/profile/edit',
      controller:'ProfileAdminController',
      controllerAs:'peCtrl'
    }).when('/profile/password',{
      templateUrl:'/profile/password',
      controller:'ProfileAdminController',
      controllerAs:'peCtrl'
    })

    //$locationProvider.html5Mode(true);
  })
})(window)
