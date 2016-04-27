angular.module('smartMeeting')
.directive( 'agendaNoteForm', ['agendaNotes', 'users', function (agendaNotes, users) {
  return {
    scope: {
      agendaItem: '=agendaItem',
      noteTypes: '=noteTypes'
    },
    restrict: 'E',
    template: '<form class="new-agenda-note-form" ng-submit="createAgendaNote()">\
                <table><tr>\
                  <td class="delete-icon">\
                  </td>\
                  <td class="note-type-select">\
                    <select class="form-control" ng-init="note_type = noteTypes[0].value" ng-model="note_type" ng-options="t.value as t.text for t in noteTypes"></select>\
                  </td>\
                  <td><input type="text" class="form-control" ng-model="body" placeholder=""></td>\
                  <td class="users" ng-show="note_type==1">\
                    <tags-input ng-model="users" display-property="username" add-from-autocomplete-only="true" placeholder="Owners">\
                      <auto-complete source="autocompleteUsers($query)"></auto-complete>\
                    </tags-input>\
                  </td>\
                  <td class="due-date" ng-show="note_type==1">\
                    <div class="dropdown">\
                      <a class="dropdown-toggle" role="button" data-toggle="dropdown" data-target="#" href="#">\
                        <input type="text" placeholder="Due" class="form-control" ng-hide="true" ng-model="due_date">\
                        <div class="form-control btn"><i class="glyphicon glyphicon-calendar"></i></span>\
                      </a>\
                      <ul class="dropdown-menu" role="menu">\
                          <datetimepicker ng-model="due_date" data-datetimepicker-config="{ minView: \'day\', dropdownSelector: \'#meeting-datetime\' }"/>\
                      </ul>\
                    </div>\
                  </td>\
                  <td class="note-submit"><input type="submit" class="form-control" value="+"></td>\
                <tr/></table>\
              </form>',

    link: function ( scope, element, attrs ) {
      scope.due_date = Date.now();
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
          scope.due_date = Date.now();
        });
      };

      scope.autocompleteUsers = function (query) {
        return users.search(query);
      };
    }
  };
}]);