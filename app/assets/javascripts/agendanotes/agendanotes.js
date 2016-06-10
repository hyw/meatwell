angular.module('smartMeeting')
.factory('agendaNotes', [
    '$http',
    function($http){
        var o = {
            agenda_notes: []
        };
        
        o.create = function(agendanote){
            return $http.post('/agenda_notes.json', agendanote).success(function(data){
                o.agenda_notes.push(data);
            });
        };

        o.save = function(agendanote){
            return $http.put('/agenda_notes/' + agendanote.id + '.json', agendanote);
        };

        o.delete = function(agendanote){
            return $http.delete('/agenda_notes/' + agendanote.id + '.json', agendanote);
        };

        o.addAgendaNoteUser = function(agendanote, user){
            var data = {
                'user': user,
                'agenda_note_id': agendanote.id
            };
            return $http.post('/agenda_note_users.json', data).success(function(data){
            });
        };

        o.deleteAgendaNoteUser = function(agendanote, user){
            return $http.put('/agenda_notes/' + agendanote.id + '/delete_user.json', user).success(function(data){
            });
        };

        return o;
    }
]);