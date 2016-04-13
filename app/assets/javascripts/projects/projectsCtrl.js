angular.module('smartMeeting')
.controller('ProjectsCtrl', [
	'$scope',
	'projects',
	'users',
	function($scope, projects, users){
		$scope.projects = projects.projects;
		$scope.memberprojects = projects.memberprojects;

		$scope.createProject = function(){
			if(!$scope.title || $scope.title === ''){
				return;
			}
			projects.create({
				title: $scope.title,
				members: $scope.members
			});
			$scope.title = '';
		};

		$scope.autocompleteUsers = function(query){
			return users.search(query);
		};

		$scope.joinProject = function(project){
			projects.join(project);
		};

		$scope.leaveProject = function(project){
			projects.leave(project);
		};
	}
]);