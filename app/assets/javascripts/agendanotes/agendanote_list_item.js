angular.module('smartMeeting')
.directive( 'agendaNoteListItem', ['agendaNotes', 'agendaNoteTypeReverseMap', function (agendaNotes, agendaNoteTypeReverseMap) {

    function link( scope, element, attrs ) {
        scope.updateNoteLabel = function(){
            var selected = _.find(scope.noteTypes, function(option){ return option.value == scope.agendaNote.note_type; });
            scope.noteTypeLabel = (scope.agendaNote.note_type && selected) ? selected.text : 'Not set';
        };

        scope.removeAgendaNote = function () {
            agendaNotes.delete(scope.agendaNote).success(function(removedagendanote){
                scope.agendaItem.agenda_notes = _.reject(scope.agendaItem.agenda_notes, function(agenda_note){ return agenda_note.id == scope.agendaNote.id; });
            });
        };

        scope.saveAgendaNote = function () {
            agendaNotes.save(scope.agendaNote).success(function(){
                scope.updateNoteLabel();
                return true;
            });
        };

        scope.updateNoteLabel();
    };

    return {
        restrict: 'A',
        scope: {
            agendaNote: '=agendaNote',
            agendaItem: '=agendaItem',
            noteTypes: '=noteTypes'
        },
        templateUrl: 'agendanotes/_agendanote_item.html',
        link: link
    };
}]);