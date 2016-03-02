angular.module('smartMeeting')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){
	$scope.login = function() {
  	Auth.login($scope.user).then(function(){
    		$state.go('logged-in.projects');
  	});
  };

  $scope.register = function() {
  	Auth.register($scope.user).then(function(){
  		$state.go('logged-in.projects');
  	});
	};
}]);