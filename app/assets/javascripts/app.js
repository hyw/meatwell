angular.module('smartMeeting', ['ui.router', 'templates', 'Devise', 'ngTagsInput', "ui.calendar", "xeditable", "ui.bootstrap.datetimepicker", "ui.sortable", 'angular-clipboard', 'monospaced.elastic'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      // .state('logged-in', {
      //   abstract: true,
      //   template: '<div ui-view></div>',
      //   data: {
      //     requireLogin: true
      //   },
      //   resolve: {
      //     currentUser: ['Auth', function(Auth){
      //       return Auth.currentUser();
      //     }]
      //   }
      // })
    .state('logged-out', {
      abstract: true,
      template: '<div ui-view></div>',
      data: {
        requireLogin: false,
        requireLogout: true
      }
    })
    .state('neutral', {
      abstract: true,
      template: '<div ui-view></div>',
      data: {
        requireLogin: false,
        requireLogout: false
      }
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
      templateUrl: 'meetings/_show.html',
      controller: 'MeetingCtrl',
      resolve: {
        meeting: ['$stateParams', 'meetings', function($stateParams, meetings){
          return meetings.getPublic($stateParams.access_code);
        }]
      }
    });
 
    $urlRouterProvider.otherwise('home');
  }
])
.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    var requireLogout = toState.data.requireLogout;
    if(requireLogin){
      if(!Auth.isAuthenticated()){
        $state.go('neutral.home');
      }
    }else if(requireLogout){
      if(Auth.isAuthenticated()){
        $state.go('logged-in.projects');
      }
    }
  });
}])
.run(['editableOptions', function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);