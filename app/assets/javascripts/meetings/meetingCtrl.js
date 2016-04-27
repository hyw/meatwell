angular.module('smartMeeting')
.controller('MeetingCtrl', [
  '$scope',
  '$timeout',
  'meetings',
  'meeting',
  'users',
  'agendaItems',
  'meetingStatuses',
  'agendaItemStatuses',
  function($scope, $timeout, meetings, meeting, users, agendaItems, meetingStatuses, agendaItemStatuses){
    $scope.meetingStatuses = meetingStatuses;
    $scope.agendaItemStatuses = agendaItemStatuses;
    $scope.meeting = meeting;
    meeting.playing = false;
    $scope.meeting.agenda_items = _.sortBy($scope.meeting.agenda_items, 'ordering');
    $scope.noteTypes = [
      {value: 1, text: 'ACTION'},
      {value: 2, text: 'INFO'},
      {value: 3, text: 'IDEA'},
      {value: 4, text: 'DECISION'}
    ];
    $scope.sortableOption = {
      stop: function(e, ui) {
        _.each($scope.meeting.agenda_items, function(item, index, list){
          list[index].ordering = index;
          agendaItems.save(list[index]);
        });
        $scope.pauseMeeting(meeting);
      }
    };

    $scope.$watch("meeting", function(newValue, oldValue) {
      $scope.refreshActionItems();
    }, true);

    $scope.setUpCountdown = function(item){
      item.playing = false;
    };

    $scope.finishMeeting = function(meeting){
      if (meeting.status !== meetingStatuses.finished) {
        meeting.playing = false;
        meeting.status = meetingStatuses.finished;
        var now = new Date();
        meeting.ended_at = now.toISOString();
        meetings.save(meeting);
        //set ended_at for each agenda item too
        _.each(meeting.agenda_items, function(item) {
          item.active = false;
          item.playing = false;
          $timeout.cancel(item.timeout);
          item.status = agendaItemStatuses.finished;
          item.ended_at = now.toISOString();
          agendaItems.save(item);
        });
      }
    };

    $scope.startMeeting = function(meeting){
      if (meeting.status !== meetingStatuses.finished) {
        meeting.playing = true;
        if (meeting.status === meetingStatuses.unstarted) { // if this is the first time this meeting was started
          meeting.status = meetingStatuses.started;
          var now = new Date();
          meeting.started_at = now.toISOString();
          meetings.save(meeting);
        }
        notFinished = _.filter(meeting.agenda_items, function(item){ if (item.countdown > 0) return item; });
        $scope.startItem(_.first(notFinished));
      }
    };

    $scope.pauseMeeting = function(meeting){
      meeting.playing = false;
      $scope.makeAllInactive();
    };

    $scope.startItem = function(item){
      $scope.makeActive(item);
      if (!item.playing && (meeting.status === meetingStatuses.started)) {
        meeting.playing = true;
        if (item.status === agendaItemStatuses.unstarted) { // if this is the first time this item was started
          item.status = agendaItemStatuses.started;
          var now = new Date();
          item.started_at = now.toISOString();
          agendaItems.save(item);
        }
        item.playing = true;
        item.timeout = countDown(item);
      }
    };

    $scope.stopItem = function(item){
      item.playing = false;
      agendaItems.save(item);
      $timeout.cancel(item.timeout);
    };

    var countDown = function(item){
      item.countdown--;
      if (item.countdown % 5 === 0) {
        agendaItems.save(item);
      }
      if (item.playing) { // avoid countinuing countdown if you press start and stop within the duration of 1 second
        item.timeout = $timeout(countDown, 1000, true, item);
      }
    };

    $scope.makeAllInactive = function(item){
      _.each(_.without(meeting.agenda_items, item), function(item){
        item.active = false;
        $scope.stopItem(item);
      });
    };

    $scope.makeActive = function(item){
      $scope.makeAllInactive(item);
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
          $scope.setUpCountdown(item);
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

    $scope.refreshActionItems = function(){
      $scope.action_items = _.flatten(_.map($scope.meeting.agenda_items, function(item){ return _.where(item.agenda_notes, {note_type: 1}); }));
    };
  }
]);