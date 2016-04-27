angular.module('smartMeeting')
.filter('secondsToTime', function($filter) {
    return function(seconds) {
        return $filter('date')(new Date(0, 0, 0).setSeconds(Math.abs(seconds)), 'HH:mm:ss');
    };
})
.filter('secondsToWidthPercentage', ['agendaItemStatuses', function(agendaItemStatuses) {
    return function(item) {
        if (item.countdown < 0) return 100;
        var totalInSeconds = item.duration*60;
        return ((totalInSeconds - item.countdown)/totalInSeconds)*100;
    };
}]);