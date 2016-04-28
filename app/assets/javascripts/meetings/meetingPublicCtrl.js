angular.module('smartMeeting')
.controller('MeetingPublicCtrl', [
  '$scope',
  '$stateParams',
  'meeting',
  'agendaItems',
  'meetingStatuses',
  'agendaNoteTypeMap',
  function($scope, $stateParams, meeting, agendaItems, meetingStatuses, agendaNoteTypeMap){
    $scope.initialize = function(){
      $scope.meetingStatuses = meetingStatuses;
      $scope.agendaNoteTypeMap = agendaNoteTypeMap;
      if($stateParams.access_code == meeting.access_code){
        $scope.meeting = meeting;
      }else{
        $scope.meeting = null;
        return;
      }
      $scope.action_items = _.flatten(_.map($scope.meeting.agenda_items, function(item){ return _.where(item.agenda_notes, {note_type: 1}); }));
    };

    $scope.initialize();

  }
]);