angular.module('smartMeeting')
.controller('ProjectCtrl', [
  '$scope',
  'project',
  'users',
  'meetings',
  'Auth',
  'projects',
  'uiCalendarConfig',
  '$timeout',
  function($scope, project, users, meetings, Auth, projects, uiCalendarConfig, $timeout){
    $scope.project = project;

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
        description: $scope.description
      }).success(function(meeting){
        $scope.project.meetings.push(meeting);
      });
      $scope.title = '';
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
        showError('Invalid Meeting Title');
        return false;
      }
      else if(!$scope.attendees || $scope.attendees === ''){
        showError('Must have at least one attendee');
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
      return users.searchByProject(query, $scope.project.id);
    };

    $scope.joinProject = function(project){
      projects.join(project);
    };

    $scope.leaveProject = function(project){
      projects.leave(project);
    };

  }
]);

