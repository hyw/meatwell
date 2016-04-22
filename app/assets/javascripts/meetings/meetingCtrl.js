angular.module('smartMeeting')
.controller('MeetingCtrl', [
  '$scope',
  'meetings',
  'meeting',
  'users',
  'agendaItems',
  function($scope, meetings, meeting, users, agendaItems){
    $scope.meeting = meeting;

    $scope.makeActive= function(item){
      _.each($scope.meeting.agenda_items, function(item){item.active = false;});
      item.active = true;
    };

    $scope.createAgendaItem = function(){
      if($scope.title && $scope.title !== ''){
        agendaItems.create({
          meeting_id: $scope.meeting.id,
          title: $scope.title,
          duration: $scope.duration || 15
        }).success(function(agendaitem){
          $scope.meeting.agenda_items.push(agendaitem);
          $('.agenda-item-form .title').focus();
        });
        $scope.title = '';
        $scope.duration = '';
      }
    };

    $scope.saveAgendaItem = function(item){
      if(item.title && item.title !== ''){
        agendaItems.save(item).success(function(){
          return true;
        });
      }
    };

    $scope.removeAgendaItem = function(removedagendaitem){
      agendaItems.deleteItem(removedagendaitem)
      .success(function(item){
        $scope.meeting.agenda_items = _.reject($scope.meeting.agenda_items, function(agenda_item){ return agenda_item.id == removedagendaitem.id; });
      });
    };
  }
]);