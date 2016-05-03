angular.module('smartMeeting', ['ui.router', 'templates', 'Devise', 'ngTagsInput', "ui.calendar", "xeditable", "ui.bootstrap.datetimepicker", "ui.sortable", 'angular-clipboard'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('logged-in', {
        abstract: true,
        template: '<div ui-view></div>',
        data: {
          requireLogin: true
        },
        resolve: {
          currentUser: ['Auth', function(Auth){
            return Auth.currentUser();
          }]
        }
      })
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
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('logged-out.login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl'
      })
      .state('logged-out.register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl'
      })
      .state('logged-out.meeting', {
        url:'/a/meetings/p/{id}/{access_code}',
        templateUrl: 'meetings/_show.html',
        controller: 'MeetingCtrl',
        resolve: {
          meeting: ['$stateParams', 'meetings', function($stateParams, meetings){
            return meetings.getPublic($stateParams.id, $stateParams.access_code);
          }]
        }
      })
      .state('logged-in.projects', {
        url: '/a/projects',
        templateUrl: 'projects/_index.html',
        controller: 'ProjectsCtrl',
        resolve: {
          projectsPromise: ['currentUser', 'projects', function(currentUser, projects){
            projects.setCurrentUser(currentUser);
            return projects.getAll();
          }]
        }
      })
      .state('logged-in.project', {
        url: '/a/projects/{id}',
        templateUrl: 'projects/_show.html',
        controller: 'ProjectCtrl',
        resolve: {
          project: ['$stateParams','projects', 'currentUser', function($stateParams, projects, currentUser){
              projects.setCurrentUser(currentUser);
              return projects.get($stateParams.id);
          }]
        }
      })
      .state('logged-in.meeting', {
        url: '/a/meetings/{id}',
        templateUrl: 'meetings/_show.html',
        controller: 'MeetingCtrl',
        resolve: {
          meeting: ['$stateParams', 'meetings', 'currentUser', function($stateParams, meetings, currentUser){
            return meetings.get($stateParams.id);
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