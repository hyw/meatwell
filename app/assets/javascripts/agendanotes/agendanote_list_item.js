angular.module('smartMeeting')
.directive( 'agendaNoteListItem', ['agendaNotes', function (agendaNotes) {
    return {
        restrict: 'E',
        scope: {
            agendaNote: '=agendaNote',
            agendaItem: '=agendaItem'
        },
        template: '<span ng-click="removeAgendaNote()" class="glyphicon glyphicon-remove" aria-hidden="true"></span> <a href="#" onaftersave="saveAgendaNote()" buttons="no" editable-text="agendaNote.body">{{agendaNote.body}}</a>',

        link: function ( scope, element, attrs ) {
            scope.removeAgendaNote = function () {
                agendaNotes.delete(scope.agendaNote).success(function(removedagendanote){
                    scope.agendaItem.agenda_notes = _.reject(scope.agendaItem.agenda_notes, function(agenda_note){ return agenda_note.id == scope.agendaNote.id; });
                });
            };

            scope.saveAgendaNote = function () {
                agendaNotes.save(scope.agendaNote).success(function(){
                    return true;
                });
            };
        }
    };
}]);