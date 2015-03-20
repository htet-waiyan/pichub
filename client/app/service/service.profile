(function(w){
	var pichub=w.pichubApp;

	function ProfileService($http,$q){
		this.getProfileUserData=function(){
			var defered=$q.defer();

			$http({
				url:'/api/profile/userdata',
				method:'GET'
			}).success(function(data,status,config){
				defered.resolve(data);
			}).error(function(data,status,config){
				defered.reject(data);
			})

			return defered.promise;
		};
	}

	pichub.service('ProfileService',['$http','$q',ProfileService]);
})(window)