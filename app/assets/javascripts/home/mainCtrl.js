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
                meetings.create({
                    title: $scope.title,
                    duration: $scope.duration
                }).success(function(meeting){
                    $scope.title = '';
                    $scope.duration = '';
                });
            }
        };

        validateCreateMeetingForm = function(){
            return $scope.title != null && $scope.title !== "" && $scope.duration != null; // http://stackoverflow.com/a/2647888
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
})
.directive('clickOff', function($parse, $document) {
    var dir = {
        compile: function($element, attr) {
          // Parse the expression to be executed
          // whenever someone clicks _off_ this element.
          var fn = $parse(attr["clickOff"]);
          return function(scope, element, attr) {
            // add a click handler to the element that
            // stops the event propagation.
            element.bind("click", function(event) {
              event.stopPropagation();
            });
            angular.element($document[0].body).bind("click", function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
          };
        }
      };
    return dir;
});