(function(w){
	var pichub=w.pichubApp;

	function ProfileContentController($scope){
		$scope.test="profilecontentcontroller";
	}

	function ProfileAdminController($scope,$location,profileService){
		profileService.getProfileUserData()
			.then(function(data){
				$scope.userPart=data;
				$scope.newPasswd;
			},function(err){
				//redirect to 500 error page
			})

		this.submit=function(){
			$scope.userPart.newPasswd=$scope.newPasswd;
			profileService.saveUserProfile($scope.userPart)
					.then(function(data){
						$scope.msg=data.msg;
					},function(error){
						$scope.errMsg=data.errMsg;
					})
		}
		this.cancelForm=function(){
			$location.path('/profile'); //
		}
	}

	pichub
		.controller('ProfileContentController',['$scope',ProfileContentController])
		.controller('ProfileAdminController',['$scope','$location','ProfileService',ProfileAdminController]);
})(window)
