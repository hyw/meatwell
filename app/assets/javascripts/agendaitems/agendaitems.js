angular.module('smartMeeting')
.factory('agendaItems', [
    '$http',
    function($http){
        var o = {
            agenda_items: []
        };
        
        o.create = function(agendaitem){
            return $http.post('/agenda_items.json', agendaitem).success(function(data){
                o.agenda_items.push(data);
            });
        };

        o.save = function(agendaitem){
            return $http.put('/agenda_items/' + agendaitem.id + '.json', agendaitem);
        };

        o.deleteItem = function(agendaitem){
            return $http.delete('/agenda_items/' + agendaitem.id + '.json', agendaitem);
        };

        return o;
    }
]);