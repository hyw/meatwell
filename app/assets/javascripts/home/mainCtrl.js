angular.module('smartMeeting')
.controller('MainCtrl', [
	'$scope',
	'meetings',
  '$location',
	function($scope, meetings, $location){
    $scope.createMeeting = function(){
      meetings.createPublic({
        title: $scope.title,
        duration: $scope.duration
      }).success(function(meeting){
        $location.path('/a/meetings/p/' + meeting.id + '/' + meeting.access_code);
      });
    }
	}
]);