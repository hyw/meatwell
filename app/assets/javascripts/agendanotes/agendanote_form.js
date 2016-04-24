angular.module('smartMeeting')
.directive( 'agendaNoteForm', ['agendaNotes', function (agendaNotes) {
  return {
    scope: {
      agendaItem: '=agendaItem',
      noteTypes: '=noteTypes'
    },
    restrict: 'E',
    template: '<form class="new-agenda-note-form" ng-submit="createAgendaNote()">\
                <table style="width:100%;"><tr>\
                  <td class="delete-icon">\
                  </td>\
                  <td class="note-type-select">\
                    <select class="form-control" ng-init="note_type = noteTypes[0].value" ng-model="note_type" ng-options="t.value as t.text for t in noteTypes"></select>\
                  </td>\
                  <td><input type="text" class="form-control" ng-model="body" placeholder=""></td>\
                  <td class="note-submit"><input type="submit" class="form-control" value="Save"></td>\
                <tr/></table>\
              </form>',

    link: function ( scope, element, attrs ) {
      scope.createAgendaNote = function () {
        agendaNotes.create({
          body: scope.body,
          agenda_item_id: scope.agendaItem.id,
          note_type: scope.note_type
        }).success(function(agendanote){
          scope.agendaItem.agenda_notes = scope.agendaItem.agenda_notes || [];
          scope.agendaItem.agenda_notes.push(agendanote);
          scope.body = '';
        });
      };
    }
  };
}]);