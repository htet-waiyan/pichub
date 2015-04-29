(function(w){
  var pichub=w.pichubApp;

  pichub.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    //$urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
          url:'',
          templateUrl:'/home'
        })
        .state('explore',{
          url:'/explore/:keyword',
          template:'<h3>Explore {{data}}</h3>',
          controller:function($scope,$stateParams){
            console.log($stateParams.keyword);
            $scope.data=$stateParams.keyword;
          }
        })
        .state('data',{
          url:'/data/:keyword',
          template:'<h3>Getting Data...</h3>',
          controller:function($scope,$stateParams){
            console.log($stateParams);
          }
        })
        .state('search',{
          url:'/search/:keyword',
          templateUrl:'/search',
          controller:'SearchController',
          resolve:{
            profileService:'ProfileService',
            results:function(profileService,$stateParams){
              return profileService.searchProfile($stateParams.keyword)
            }
          }
        })
  })
})(window)
