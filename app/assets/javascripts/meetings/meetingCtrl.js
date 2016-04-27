angular.module('smartMeeting')
.controller('MeetingCtrl', [
  '$scope',
  'meetings',
  'meeting',
  'users',
  'agendaItems',
  function($scope, meetings, meeting, users, agendaItems){
    $scope.meeting = meeting;
    $scope.noteTypes = [
      {value: 1, text: 'ACTION'},
      {value: 2, text: 'INFO'},
      {value: 3, text: 'IDEA'},
      {value: 4, text: 'DECISION'}
    ];

    $scope.meeting.agenda_items = _.sortBy($scope.meeting.agenda_items, 'ordering');
    $scope.sortableOption = {
      stop: function(e, ui) {
        _.each($scope.meeting.agenda_items, function(item, index, list){
          list[index].ordering = index;
          $scope.saveAgendaItem(list[index]);
        });
      }
    };

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
          $scope.checkIfAgendaIsTooLong();
        });
        $scope.title = '';
        $scope.duration = '';
      }
    };

    $scope.saveAgendaItem = function(item){
      if(item.title && item.title !== ''){
        agendaItems.save(item).success(function(){
          $scope.checkIfAgendaIsTooLong();
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

    $scope.checkIfAgendaIsTooLong = function(){
      var total = _.reduce($scope.meeting.agenda_items, function(memo, item){ return memo + item.duration; }, 0);
      if(total > $scope.meeting.duration){
        alert('Your meeting agenda is currently overtime by ' + String(total-$scope.meeting.duration) + ' minutes.  Please reduce your agenda items.');
      }
    };
  }
]);