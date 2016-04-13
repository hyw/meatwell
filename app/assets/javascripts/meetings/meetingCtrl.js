angular.module('smartMeeting')
.controller('MeetingCtrl', [
	'$scope',
	'meetings',
	'meeting',
	'users',
	function($scope, meetings, meeting, users){
		$scope.meeting = meeting;
	}
]);