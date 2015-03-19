(function(w){
	var pichub=w.pichubApp;

	function ProfileContentController($scope){
		$scope.test="profilecontentcontroller";
	}

	function ProfileAdminController($scope){
		$scope.test="profileadmincontroller";
	}

	pichub
		.controller('ProfileContentController',['$scope',ProfileContentController])
		.controller('ProfileAdminController',['$scope',ProfileAdminController])
})(window)