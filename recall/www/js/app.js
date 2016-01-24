// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html',
    controller: 'AppCtrl'
  })

  .state('app.dash', {
    url: '/dash',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashCtrl'
      }
    }
  })




  .state('app.Family', {
    url: '/Family',
    views: {
      'menuContent': {
        templateUrl: 'templates/Family.html',
        controller: 'FamilyCtrl'
      }
    }
  })
  .state('app.Events', {
    url: '/Events',
    views: {
      'menuContent': {
        templateUrl: 'templates/Events.html',
        controller: 'EventsCtrl'
      }
    }
  })
  .state('app.Personal', {
    url: '/Personal',
    views: {
      'menuContent': {
        templateUrl: 'templates/Personal.html',
        controller: 'PersonalCtrl'
      }
    }
  })
  .state('app.Music', {
    url: '/Music',
    views: {
      'menuContent': {
        templateUrl: 'templates/Music.html',
        controller: 'MusicCtrl'
      }
    }
  })
  .state('app.Other', {
    url: '/Other',
    views: {
      'menuContent': {
        templateUrl: 'templates/Other.html',
        controller: 'OtherCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dash');

});
