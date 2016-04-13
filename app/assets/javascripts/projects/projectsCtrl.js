angular.module('smartMeeting')
.controller('ProjectsCtrl', [
  '$scope',
  'projects',
  'users',
  '$timeout',
  function($scope, projects, users, $timeout){
    $scope.projects = projects.projects;
    $scope.memberprojects = projects.memberprojects;

    $scope.createProject = function(){
      if(!validateProject()){
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

    function showError(message){
      $scope.formError = false;
      $scope.doFade = false;
      $scope.formError = true;
      $scope.errorMessage = message;
      $timeout(function(){
        $scope.doFade = true;
      }, 2500);
    }

    function validateProject(){
      if(!$scope.title || $scope.title === ''){
        showError('Invalid Project Title');
        return false;
      }
      else if(!$scope.members || $scope.members === ''){
        showError('Must have at least one member');
        return false;
      }
      else{
        return true;
      }
    }
  }
]);