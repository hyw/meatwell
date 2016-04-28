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
        o.get = function(id){
            return $http.get('/meetings/' + id + '.json').then(function(res){
                return res.data;
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

        o.start = function(meeting){
            if (meeting.status === meetingStatuses.unstarted) { // if this is the first time this meeting was started
                meeting.status = meetingStatuses.started;
                meeting.started_at = new Date().toISOString();
                o.save(meeting);
            }
        };

        o.finish = function(meeting){
            meeting.playing = false;
            meeting.status = meetingStatuses.finished;
            meeting.ended_at = new Date().toISOString();
            o.save(meeting);
        };

        return o;
    }
]);