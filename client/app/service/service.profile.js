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

		this.isNewUser=function(){
			var defered=$q.defer();

			$http({
				url:'/api/profile/newUser',
				method:'GET'
			}).success(function(data,status,config){
				defered.resolve(data);
			}).error(function(data,status,config){
				defered.reject(data);
			})

			return defered.promise;
		}

		this.saveUserProfile=function(profile){
			var defered=$q.defer();
			$http({
				url:'/api/profile/edit/save',
				method:'POST',
				data:JSON.stringify(profile)
			}).success(function(data,status,config){
				defered.resolve(data);
			}).error(function(data,status,config){
				defered.reject(data);
			})

			return defered.promise;
		}
		this.savePasswordChange=function(password){
			var defered=$q.defer();
			$http({
				url:'/api/profile/password/save',
				method:'POST',
				data:JSON.stringify(password)
			}).success(function(data,status,config){
				defered.resolve(data);
			}).error(function(data,status,config){
				defered.reject(data);
			})

			return defered.promise;
		}

		this.searchProfile=function(_keyword){
			var defered=$q.defer();
			$http({
				url:'/api/profile/search',
				method:'GET',
				params:{keyword:_keyword}
			}).success(function(data,status,option){
				defered.resolve(data);
			}).error(function(data,status,option){
				defered.reject(data);
			})

			return defered.promise;
		}
	}

	pichub.service('ProfileService',['$http','$q',ProfileService]);
})(window);







