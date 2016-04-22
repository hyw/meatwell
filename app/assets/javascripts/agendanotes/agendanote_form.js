angular.module('smartMeeting')
.directive( 'agendaNoteForm', ['agendaNotes', function (agendaNotes) {
    return {
        scope: {
            agendaItem: '=agendaItem'
        },
        restrict: 'E',
        template: '<form ng-submit="createAgendaNote()"><input type="text" ng-model="body" style="width:60%; display:inline-block;" placeholder=""><input type="submit" value="Save"></form>',

        link: function ( scope, element, attrs ) {
            scope.createAgendaNote = function () {
                agendaNotes.create({
                    body: scope.body,
                    agenda_item_id: scope.agendaItem.id
                }).success(function(agendanote){
                    scope.agendaItem.agenda_notes = scope.agendaItem.agenda_notes || [];
                    scope.agendaItem.agenda_notes.push(agendanote);
                    scope.body = '';
                });
            };
        }
    };
}]);