angular.module('smartMeeting')
.controller('ProjectCtrl', [
  '$scope',
  '$location',
  'project',
  'users',
  'meetings',
  'Auth',
  'projects',
  'uiCalendarConfig',
  '$timeout',
  function($scope, $location, project, users, meetings, Auth, projects, uiCalendarConfig, $timeout){
    $scope.project = project;
    setDefaults();

    function setDefaults(){
      $scope.title = '';
      $scope.attendees = [
        { username:project.owner.username } //include owner as default member of new meeting
      ];
      $scope.date = '';
      $scope.location = '';
      $scope.description = '';
      $scope.duration = 60;
    }

    $scope.createMeeting = function(){
      if(!validateMeeting()){
        return;
      }

      meetings.create({
        project_id: $scope.project.id,
        title: $scope.title,
        attendees: $scope.attendees,
        duration: $scope.duration,
        location: $scope.location,
        description: $scope.description,
        date: $scope.datetime.toISOString()
      }).success(function(meeting){
        $scope.project.meetings.push(meeting);
      });
      initialize(); //cleans fields
    };

    function showError(message){
      $scope.formError = false;
      $scope.doFade = false;
      $scope.formError = true;
      $scope.errorMessage = message;
      $timeout(function(){
        $scope.doFade = true;
      }, 2500);
    }

    function validateMeeting(){
      if(!$scope.title || $scope.title === ''){
        showError('Invalid Meeting Title.');
        return false;
      }
      else if(!$scope.attendees || $scope.attendees === ''){
        showError('Must have at least one attendee.');
        return false;
      }
      else if(!$scope.datetime || $scope.datetime === '') {
        showError('Must specify a date and time.');
      }
      else if(!$scope.duration || $scope.duration === ''){
        showError('Meeting must have a duration.');
        return false;
      }
      else{
        return true;
      }
    }

    $scope.gcalLogin = function() {
      window.location.href = "/auth/google_oauth2" + "?state=" + location.pathname;
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

    $scope.goToMeeting = function(meeting) {
      var meetingUrl = "/a/meetings/" + meeting.id;
      $location.url(meetingUrl);
    };
  }
]);