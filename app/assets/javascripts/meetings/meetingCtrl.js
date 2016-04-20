angular.module('smartMeeting')
.controller('MeetingCtrl', [
  '$scope',
  'meetings',
  'meeting',
  'users',
  'agendaItems',
  function($scope, meetings, meeting, users, agendaItems){
    $scope.meeting = meeting;

    $scope.createAgendaItem = function(){
      if($scope.title && $scope.title !== ''){
        agendaItems.create({
          meeting_id: $scope.meeting.id,
          title: $scope.title,
          duration: $scope.duration || 15
        }).success(function(agendaitem){
          $scope.meeting.agenda_items.push(agendaitem);
          $('#title').focus();
        });
      $scope.title = '';

      }
    };

    $scope.saveAgendaItem = function(item){
      if(item.title && item.title !== ''){
        agendaItems.save({
          id: item.id,
          title: item.title
        }).success(function(){
          return true;
        });
      }
    };

    $scope.removeAgendaItem = function(agendaitem){
      agendaItems.deleteItem(agendaitem)
      .success(function(item){
        var index = $scope.meeting.agenda_items.indexOf(agendaitem);
        $scope.meeting.agenda_items.splice(index, 1);
      });
    };
  }
]);