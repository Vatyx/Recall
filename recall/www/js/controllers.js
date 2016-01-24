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


})

.controller('EventsCtrl', function($scope, $rootScope, $ionicModal) {

  $scope.events = [

  ]
})

.controller('AccountCtrl', function($scope, $rootScope) {

});
