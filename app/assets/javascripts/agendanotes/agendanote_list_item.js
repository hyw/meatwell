angular.module('smartMeeting')
.directive( 'agendaNoteListItem', ['agendaNotes', function (agendaNotes) {
    return {
        restrict: 'A',
        scope: {
            agendaNote: '=agendaNote',
            agendaItem: '=agendaItem',
            noteTypes: '=noteTypes'
        },
        template: '<tr>\
                    <td class="delete-icon">\
                        <span ng-click="removeAgendaNote()" class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
                    </td>\
                    <td class="note-type-select">\
                        <a href="#" onaftersave="saveAgendaNote()" buttons="no" editable-select="agendaNote.note_type" e-ng-options="t.value as t.text for t in noteTypes">{{noteTypeLabel}}</a>\
                    </td>\
                    <td>\
                        <a href="#" blur="submit" onaftersave="saveAgendaNote()" buttons="no" editable-text="agendaNote.body">{{agendaNote.body}}</a>\
                    </td>\
                    <td class="users" ng-show="agendaNote.note_type == 1">\
                        <span ng-repeat="user in agendaNote.users">{{user.username}}, </span>\
                    </td>\
                    <td class="due-date" ng-show="agendaNote.note_type == 1">\
                        {{agendaNote.due_date | date:\'shortDate\'}}\
                    </td>\
                </tr>',

        link: function ( scope, element, attrs ) {

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

        }
    };
}]);