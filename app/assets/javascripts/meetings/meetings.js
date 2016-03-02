angular.module('smartMeeting')
.factory('meetings', [
	'$http',
	function($http){
		var o = {
    		meetings: []
  		};
		o.getAll = function(){
		    return $http.get('/meetings.json').success(function(data){
		      	angular.copy(data, o.meetings);
		    });
		};	
		o.create = function(meeting){
			return $http.post('/meetings.json', meeting).success(function(data){
				o.meetings.push(data);
			});

		};
		o.get = function(id){
			return $http.get('/meetings/' + id + '.json').then(function(res){
				return res.data;
			});
		};

		return o;
	}
]);