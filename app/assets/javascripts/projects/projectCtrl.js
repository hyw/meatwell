angular.module('smartMeeting')
.controller('ProjectCtrl', [
	'$scope',
	'project',
	'users',
	'meetings',
	'Auth',
	'projects',
	'uiCalendarConfig',
	function($scope, project, users, meetings, Auth, projects, uiCalendarConfig){
		$scope.project = project;

		$scope.createMeeting = function(){
			if(!$scope.title || $scope.title === ''){
				return;
			}
			meetings.create({
				project_id: $scope.project.id,
				title: $scope.title,
				attendees: $scope.attendees,
				duration: $scope.duration,
				location: $scope.location,
				description: $scope.description
			}).success(function(meeting){
				$scope.project.meetings.push(meeting);
			});
			$scope.title = '';
		};

		$scope.body = ''

		$scope.gcalLogin = function() {
      		window.location.href = "/auth/google_oauth2" + "?state=" + location.pathname;
    	}

		$scope.autocompleteUsers = function(query){
			return users.searchByProject(query, $scope.project.id);
		};

		$scope.joinProject = function(project){
			projects.join(project)
		};

		$scope.leaveProject = function(project){
			projects.leave(project)
		};

	}
]);

