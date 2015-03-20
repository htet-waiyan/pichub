(function(w){
	var pichub=w.pichubApp;

	function ProfileContentController($scope){
		$scope.test="profilecontentcontroller";
	}

	function ProfileAdminController($scope,profileService){
		profileService.getUserPofileData()
			.then(function(data){
				console.log(data);
				$scope.userPart=data;
			},function(err){
				console.log(err);
			})
	}

	pichub
		.controller('ProfileContentController',['$scope',ProfileContentController])
		.controller('ProfileAdminController',['$scope','ProfileService',ProfileAdminController]);
})(window)
