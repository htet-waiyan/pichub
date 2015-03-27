(function(w){
	var pichub=w.pichubApp;

	function ProfileContentController($scope){
		$scope.test="profilecontentcontroller";
	}

	function ProfileAdminController($scope,$location,profileService){
		$scope.currentPwd=$scope.newPwd="";
		profileService.getProfileUserData()
			.then(function(data){
				$scope.userPart=data.particulars;
				$scope.newPasswd;
			},function(err){
				//redirect to 500 error page
			});

		this.submit=function(){
			$scope.userPart.newPasswd=$scope.newPasswd;
			profileService.saveUserProfile({updatedUser:$scope.userPart})
					.then(function(data){
						$scope.msg=data.msg;
					},function(error){
						$scope.errMsg=data.msg;
					})
		}
		this.changePassword=function($invalid){
			if($invalid){$scope.pwdEditForm.submitted=true; return;}
			var passwd={curPwd:$scope.currentPwd,newPwd:$scope.newPwd};
			profileService.savePasswordChange(passwd)
				.then(function(data){
					$scope.msg=data.msg;
					/*** show msg and redirect to /profile ***/
				},function(err){
					$scope.errMsg=data.msg;
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
