angular.module('smartMeeting')
.factory('agendaItems', [
    '$http',
    '$timeout',
    'agendaItemStatuses',
    function($http, $timeout, agendaItemStatuses){
        var o = {
            agenda_items: []
        };
        
        o.create = function(agendaitem){
            return $http.post('/agenda_items.json', agendaitem).success(function(data){
                o.agenda_items.push(data);
            });
        };

        o.save = function(agendaitem){
            if(agendaitem.status === agendaItemStatuses.unstarted){
               agendaitem.countdown = agendaitem.duration*60;
            }
            return $http.put('/agenda_items/' + agendaitem.id + '.json', agendaitem).success(function(data){
                agendaitem = data;
            });
        };

        o.deleteItem = function(agendaitem){
            return $http.delete('/agenda_items/' + agendaitem.id + '.json', agendaitem);
        };

        o.startItem = function(agendaitem){
            if(agendaitem.status === agendaItemStatuses.unstarted) { // if this is the first time this item was started
                agendaitem.status = agendaItemStatuses.started;
                agendaitem.started_at = new Date().toISOString();
                o.save(agendaitem);
            }
            if(!agendaitem.playing){ //debounces countDown to avoid faster than 1 second countdown
                agendaitem.playing = true;
                agendaitem.timeout = o.countDown(agendaitem);
            }
 
        };

        o.stopItem = function(agendaitem){
            if(agendaitem.playing){
                agendaitem.ended_at = new Date().toISOString();
                agendaitem.playing = false;
                o.save(agendaitem);
            }
            $timeout.cancel(agendaitem.timeout);
        };

        o.countDown = function(agendaitem){
            agendaitem.countdown--;
            if (agendaitem.countdown % 5 === 0) {
                o.save(agendaitem);
            }
            if (agendaitem.playing) { // avoid countinuing countdown if you press start and stop within the duration of 1 second
                agendaitem.timeout = $timeout(o.countDown, 1000, true, agendaitem);
            }
        };

        o.finishItem = function(agendaitem){
            agendaitem.status = agendaItemStatuses.finished;
            o.save(agendaitem);
        };

        return o;
    }
]);