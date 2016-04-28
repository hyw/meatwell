angular.module('smartMeeting')
.constant('meetingStatuses', {
	unstarted: 0,
	started: 1,
	finished: 2
})
.constant('agendaItemStatuses', {
	unstarted: 0,
	started: 1,
	finished: 2
})
.constant('agendaNoteTypes',
	[
      {value: 1, text: 'ACTION'},
      {value: 2, text: 'INFO'},
      {value: 3, text: 'IDEA'},
      {value: 4, text: 'DECISION'}
    ]
);