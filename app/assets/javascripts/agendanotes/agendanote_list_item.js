angular.module('smartMeeting')
.directive( 'agendaNoteListItem', ['agendaNotes', function (agendaNotes) {
    return {
        restrict: 'E',
        scope: {
            agendaNote: '=agendaNote',
            agendaItem: '=agendaItem'
        },
        template: '<span ng-click="removeAgendaNote(note)" class="glyphicon glyphicon-remove" aria-hidden="true"></span>{{agendaNote.body}}',

        link: function ( scope, element, attrs ) {
            scope.removeAgendaNote = function (note) {
                agendaNotes.delete(scope.agendaNote).success(function(removedagendanote){
                    scope.agendaItem.agenda_notes = _.reject(scope.agendaItem.agenda_notes, function(agenda_note){ return agenda_note.id == scope.agendaNote.id; });
                });
            };
        }
    };
}]);