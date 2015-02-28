(function(w){
	var pichub=w.pichubApp;

	var ThreadService=function($q,$http){
		this.createThread=(userId,thread){
			var defer=$q.defer();
			$http({
				url:'/thread/create',
				method:'POST',
				data:JSON.stringify(thread)
			}).success(function(data,status,config){
				//do something with the data
				defer.resolve(data);
			}).error(function(data,status,config){
				//do something with the error
				defer.reject(data);
			})

			defer.promise;
		}
	}

	pichub.service('threadService',['$q','$http',ThreadService]);
})(window)