angular.module('smartMeeting')
.controller('MeetingCtrl', [
  '$scope',
  '$location',
  'meetings',
  'meeting',
  'users',
  'agendaItems',
  'meetingStatuses',
  'agendaNoteTypes',
  function($scope, $location, meetings, meeting, users, agendaItems, meetingStatuses, agendaNoteTypes){
    $scope.initialize = function(){
      $scope.meetingStatuses = meetingStatuses;
      $scope.agendaNoteTypes = agendaNoteTypes;
      $scope.meeting = meeting || $scope.setDefaultMeeting();
      $scope.$watch("meeting", function(newValue, oldValue) {$scope.refreshActionItems();}, true);
      $scope.sortableOption = {
        stop: function(e, ui) {
          $scope.pauseMeeting($scope.meeting);
          _.each($scope.meeting.agenda_items, function(item, index, list){
            list[index].ordering = index;
            agendaItems.save(list[index]);
          });
        }
      };
      $scope.shareableLink = 'http://meatwell.io/meeting/'+$scope.meeting.access_code;
    };

    $scope.setDefaultMeeting = function(){
      return {
        'duration' : 60,
      };
    };

    $scope.saveMeeting = function(){
      if($scope.meeting.id){
        return meetings.save($scope.meeting);
      }else{
        return meetings.createPublic($scope.meeting).success(function(meeting){
          $scope.meeting = meeting;
          $location.path('/meeting/' + meeting.access_code, false);
        });
      }
    };

    $scope.startMeeting = function(meeting){
      meetings.start(meeting);
      var unfinishedItems = _.filter(meeting.agenda_items, function(item){ if (item.countdown > 0) return item; });
      $scope.startItem(_.first(unfinishedItems));
    };

    $scope.pauseMeeting = function(meeting){
      $scope.meeting.playing = false;
      $scope.makeAllInactiveAndStop();
    };

    $scope.finishMeeting = function(meeting){
      if(meeting.status == meetingStatuses.finished) {
        return;
      }
      meetings.finish(meeting);
      $scope.makeAllInactiveAndStop();
      _.each(meeting.agenda_items, function(item) {
        agendaItems.finishItem(item);
      });
    };

    $scope.startItem = function(item){
      $scope.makeAllInactiveAndStop(item);
      item.active = true;

      if(meeting.status === meetingStatuses.started) {
        meeting.playing = true;
        agendaItems.startItem(item);
      }
    };

    $scope.makeAllInactiveAndStop = function(except){
      _.each(_.without(meeting.agenda_items, except), function(item){
        item.active = false;
        agendaItems.stopItem(item);
      });
    };

    $scope.createAgendaItem = function(){
      if($scope.itemtitle && $scope.itemtitle !== ''){
        if(!$scope.meeting.id){
          $scope.saveMeeting().then(function(){
            return agendaItems.create({
              meeting_id: $scope.meeting.id,
              title: $scope.itemtitle,
              duration: $scope.itemduration || 15
            }).success(function(agendaitem){
              $scope.meeting.agenda_items.push(agendaitem);
              $('.agenda-item-form .title').focus();
              $scope.checkIfAgendaIsTooLong();
              $scope.itemtitle = '';
              $scope.itemduration = '';
            });
          });
        }else{
          agendaItems.create({
            meeting_id: $scope.meeting.id,
            title: $scope.itemtitle,
            duration: $scope.itemduration || 15
          }).success(function(agendaitem){
            $scope.meeting.agenda_items.push(agendaitem);
            $('.agenda-item-form .title').focus();
            $scope.checkIfAgendaIsTooLong();
            $scope.itemtitle = '';
            $scope.itemduration = '';
          });

        }
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

    $scope.refreshActionItems = function(){
      $scope.action_items = _.flatten(_.map($scope.meeting.agenda_items, function(item){ return _.where(item.agenda_notes, {note_type: 1}); }));
    };

    $scope.autocompleteUsers = function(query){
      return users.search(query);
    };

    $scope.addAttendee = function(attendee){
      if(!$scope.meeting.id){
        $scope.saveMeeting().then(function(){
          return meetings.addAttendee($scope.meeting.id, {
            attendee_email: attendee.email
          });
        });
      }else{
        meetings.addAttendee($scope.meeting.id, {
          attendee_email: attendee.email
        });
      }
    };

    $scope.sendMinutes = function(){
      meetings.sendMinutes($scope.meeting);
      $scope.sentminutes = true;
    };

    $scope.createFollowupMeeting = function(){
      meetings.createFollowupMeeting($scope.meeting).then(function(res){
        $location.path('/meeting/' + res.data.access_code, false);
      });
    };

    $scope.goToPreviousMeeting = function(){
      $location.path('/meeting/' + meeting.previous_meeting_access_code, false);
    }

    $scope.goToFollowupMeeting = function(){
      $location.path('/meeting/' + meeting.next_meeting_access_code, false);
    };

    $scope.initialize();
  }
]);