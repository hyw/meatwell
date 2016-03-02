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
				attendees: $scope.attendees
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


		// eventpromise = users.getCalendars();
		// eventpromise.then(function(result) {
		// 	$scope.events = result;
		// 	_.each($scope.events, function(event) {
		// 		debugger;
		// 			uiCalendarConfig.calendars.userCalendar.fullCalendar( 'addEventSource', event );
		// 	});
		// });

		// $scope.eventSources = [];

		// $scope.uiConfig = {
	 //  		calendar:{
	 //        editable: true,
	 //        selectable: true,
	 //        selectHelper: true,
	 //        fixedWeekCount: false,
	 //        header:{
	 //          left: 'month agendaWeek agendaDay',
	 //          center: 'title',
	 //          right: 'today prev,next'
	 //        },
	 //  			dayClick: function(date, jsEvent, view) {
	 //          if(view.type != 'agendaDay'){
	 //          	uiCalendarConfig.calendars.userCalendar.fullCalendar('changeView', 'agendaDay')
	 //          	uiCalendarConfig.calendars.userCalendar.fullCalendar('gotoDate', date);
	 //          	$scope.setEvents();

	 //          }else{
	 //          	alert(date);
	 //          }
		// 			},
	 //      	eventDrop: $scope.alertOnDrop,
	 //      	eventResize: $scope.alertOnResize
	 //    	}
  //  		};

	}
]);

