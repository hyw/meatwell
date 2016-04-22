angular.module('smartMeeting')
.factory('users', [
  '$http',
  '$q',
  function($http, $q){
    var o = {
        users: []
      };
    o.search = function(query){
        return $http.get('/users/search.json' + '?query=' + query).success(function(data){
            angular.copy(data, o.users);
        });
    };
    o.searchByProject = function(query, project_id){
        return $http.get('/users/search.json' + '?query=' + query + '&project_id=' + project_id).success(function(data){
            angular.copy(data, o.users);
        });
    };

    o.getCalendars = function(){
      var defer;
      defer = $q.defer();
      $http.get('users/get_calendar_events.json').success(function(data){
        defer.resolve(data);
      });
      return defer.promise;
    };


    return o;
  }
]);
