angular.module('smartMeeting')
.factory('meetings', [
    '$http',
    'meetingStatuses',
    function($http, meetingStatuses){
        var o = {
            meetings: []
        };
        o.getAll = function(){
            return $http.get('/meetings.json').success(function(data){
                angular.copy(data, o.meetings);
            });
        };
        o.create = function(meeting){
            return $http.post('/meetings.json', meeting).success(function(data){
                o.meetings.push(data);
            });
        };
        o.get = function(access_code){
            return $http.get('/meetings/show.json?access_code='+access_code).then(function(res){
                return res.data;
            });
        };

        o.getOrgMeetings = function(org) {
            return $http.get('/meetings/showorg.json?org=' + org).success(function(data){
                angular.copy(data, o.meetings);
                o.organization_name = org;
            });
        };

        o.save = function(meeting){
            return $http.put('/meetings/' + meeting.id + '.json', meeting).success(function(res){
                return res.data;
            });
        };

        o.delete = function(id){
            return $http.delete('/meetings/' + id + '.json');
        };

        o.addAttendee = function(id, attendee_email){
            return $http.post('/meetings/' + id + '/add_attendee.json', attendee_email);
        };

        o.start = function(meeting){
            if (meeting.status === meetingStatuses.unstarted) { // if this is the first time this meeting was started
                meeting.status = meetingStatuses.started;
                meeting.started_at = new Date().toISOString();
                meeting.date = new Date().toISOString();
                o.save(meeting);
            }
        };

        o.finish = function(meeting){
            meeting.playing = false;
            meeting.status = meetingStatuses.finished;
            meeting.ended_at = new Date().toISOString();
            o.save(meeting);
        };

        o.sendMinutes = function(meeting){
            return $http.get('/meetings/' + meeting.id + '/sendminutes.json').success(function(res){
                return res.data;
            });
        };

        o.createFollowupMeeting = function(meeting){
            return $http.post('/meetings/' + meeting.id + '/create_followup_meeting.json', null).success(function(res){
                return res;
            });
        };

        return o;
    }
]);