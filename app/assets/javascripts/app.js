angular.module('smartMeeting', ['ui.router', 'templates', 'Devise', 'ngTagsInput', "xeditable", "ui.sortable", 'angular-clipboard', 'monospaced.elastic', '720kb.datepicker'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
    .state('neutral', {
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('neutral.home', {
      url: '/',
      templateUrl: 'meetings/_show.html',
      controller: 'MeetingCtrl',
      resolve: {
        meeting: ['$stateParams', 'meetings', function($stateParams, meetings){
          return null;
        }]
      }
    })
    .state('neutral.org', {
      url: '/{org}',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        meeting: ['$stateParams', 'meetings', function($stateParams, meetings){
          return meetings.getOrgMeetings($stateParams.org);
        }]
      }
    })
    .state('neutral.meeting', {
      url:'/meeting/{access_code}',
      params: { no_reload: false },
      templateUrl: 'meetings/_show.html',
      controller: 'MeetingCtrl',
      resolve: {
        meeting: ['$stateParams', 'meetings', function($stateParams, meetings){
          if(!$stateParams.no_reload){
            return meetings.get($stateParams.access_code);
          }
        }]
      }
    })
    .state('neutral.project', {
      url:'/project/{slug}',
      resolve: {
        project: ['$stateParams', 'projects', function($stateParams, projects){
          return projects.redirectToMeeting($stateParams.slug);
        }]
      }
    });
 
    $urlRouterProvider.otherwise('home');
  }
])
.run(['editableOptions', function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);