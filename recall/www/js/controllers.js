angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope) {

})


.controller('AppCtrl', function($scope, $rootScope) {

  $scope.items = [
    { id: 'Home', icon: 'ion-android-home', link: '#/app/dash'},
    { id: 'Family', icon: 'ion-ios-people', link: '#/app/Family'},
    { id: 'Events', icon: 'ion-calendar', link: '#/app/Events'},
    { id: 'Personal', icon: 'ion-person', link: '#/app/Personal'},
    { id: 'Music', icon: 'ion-music-note', link: '#/app/Music'},
    { id: 'Other', icon: 'ion-help', link: '#/app/Other'}
  ];
})

.controller('FamilyCtrl', function($scope, $rootScope, $ionicModal) {

  $scope.family = [
    { name: 'John Smith', desc: 'Patient\'s son', icon: '' },
    { name: 'Jane Smith', desc: 'Patient\'s daughter', icon: '' }
  ];

  $ionicModal.fromTemplateUrl('addFamily.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.createContact = function(contact) {
    console.log(contact);
    $scope.family.push(contact);
    $scope.modal.hide();
  }

  $scope.showDelete = false;

  $scope.onItemDelete = function(person) {
    $scope.family.splice($scope.family.indexOf(person), 1);
  };

})

.controller('EventsCtrl', function($scope, $rootScope, $ionicModal) {

  $scope.events = [
    { day: 'yesterday', name: 'Playing League', desc: 'Got challenjour with ap leesong support', location: 'Philadelphia' },
    { day: 'today', name: 'Listeing to music', desc: 'Some of these songs are really good', location: 'UPenn' },
    { day: 'tomorrow', name: 'Baking', desc: 'Baking food and stuff', location: 'Dallas, Texas' },
  ];

  var days = ['yesterday', 'today', 'tomorrow'];

  function eventDayUpdates() {
    var eventDays = {};
    for (day in days) {
      eventDays[days[day]] = [];
      for (event in $scope.events) {
        if (days[day] === $scope.events[event].day.toLowerCase()) {
          eventDays[days[day]].push($scope.events[event]);
        }
      }

      if (eventDays[days[day]].length < 1) {
        delete eventDays[days[day]];
      }
    }
    return eventDays;
  };

  $scope.eventDays = eventDayUpdates();

  $scope.showDelete = false;

  $scope.onItemDelete = function(event) {
    $scope.events.splice($scope.events.indexOf(event), 1);
    $scope.eventDays = eventDayUpdates();
  };

  $ionicModal.fromTemplateUrl('addEvent.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.createEvent = function(event) {
    console.log(event);
    $scope.events.push(event);
    $scope.eventDays = eventDayUpdates();
    $scope.modal.hide();
  }

})

.controller('AccountCtrl', function($scope, $rootScope) {

});
