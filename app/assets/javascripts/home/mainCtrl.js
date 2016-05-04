angular.module('smartMeeting')
.controller('MainCtrl', [
	'$scope',
	'meetings',
    '$location',
	function($scope, meetings, $location){
        $scope.meetings = meetings.meetings; // initialize $scope's meetings
        $scope.organization_name = meetings.organization_name;

        $scope.createMeeting = function(){
            if (validateCreateMeetingForm()) {
                console.log('should submit');
                meetings.createPublic({
                    title: $scope.title,
                    duration: $scope.duration
                }).success(function(meeting){
                    $scope.title = '';
                    $scope.duration = '';
                });
            }
        };

        validateCreateMeetingForm = function(){
            return $scope.title != null && $scope.duration != null; // http://stackoverflow.com/a/2647888
        };
	}
])
.directive('ngEnter', function(){
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});