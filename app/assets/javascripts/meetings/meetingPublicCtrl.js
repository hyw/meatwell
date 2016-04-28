angular.module('smartMeeting')
.controller('MeetingPublicCtrl', [
  '$scope',
  '$stateParams',
  'meeting',
  'agendaItems',
  'meetingStatuses',
  'agendaNoteTypeMap',
  function($scope, $stateParams, meeting, agendaItems, meetingStatuses, agendaNoteTypeMap, agendaNoteTypeReverseMap){
    $scope.initialize = function(){
      $scope.meetingStatuses = meetingStatuses;
      $scope.agendaNoteTypeMap = agendaNoteTypeMap;
      $scope.meeting = meeting;
      $scope.action_items = _.flatten(_.map($scope.meeting.agenda_items, function(item){ return _.where(item.agenda_notes, {note_type: agendaNoteTypeReverseMap.ACTION}); }));
    };

    $scope.initialize();
  }
]);