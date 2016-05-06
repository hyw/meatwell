angular.module('smartMeeting')
.directive( 'agendaNoteForm', ['agendaNotes', 'users', function (agendaNotes, users) {
  return {
    scope: {
      agendaItem: '=agendaItem',
      noteTypes: '=noteTypes'
    },
    restrict: 'E',
    template: '<form class="new-agenda-note-form">\
                <table click-off="createAgendaNote()"><tr>\
                  <td class="note-type-select">\
                    <select class="form-control" ng-init="note_type = noteTypes[0].value" ng-model="note_type" ng-options="t.value as t.text for t in noteTypes"></select>\
                  </td>\
                  <td><textarea msd-elastic class="form-control" ng-model="body" placeholder=""></textarea></td>\
                  <td class="users" ng-show="note_type==1">\
                    <tags-input add-on-enter="true" add-on-space="true" add-on-comma="true" add-on-blur="true" ng-model="users" display-property="email" placeholder="Owner(s) Email">\
                    </tags-input>\
                  </td>\
                  <td class="due-date" ng-show="note_type==1">\
                    <datepicker date-format="shortDate">\
                      <input class="form-control" placeholder="Due Date" ng-model="due_date" type="text"/>\
                    </datepicker>\
                  </td>\
                <tr/></table>\
              </form>',
    link: function ( scope, element, attrs ) {
      scope.agendaItem.agenda_notes = scope.agendaItem.agenda_notes || [];

      scope.createAgendaNote = function () {
        var users = scope.note_type == 1 ? scope.users : '';
        var due_date = scope.note_type == 1 ? scope.due_date : '';

        if(!scope.body || scope.body === ''){ return; }

        agendaNotes.create({
          body: scope.body,
          agenda_item_id: scope.agendaItem.id,
          note_type: scope.note_type,
          users: users,
          due_date: due_date
        }).success(function(agendanote){
          scope.agendaItem.agenda_notes.push(agendanote);
          scope.body = '';
          scope.users = '';
          scope.due_date = '';
        });
      };

      scope.autocompleteUsers = function (query) {
        return users.search(query);
      };
    }
  };
}]);