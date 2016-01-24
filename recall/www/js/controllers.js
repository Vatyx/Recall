Parse.initialize("AVzSiP81z9WvKdNHQDWPd0lg49tLHzCofFCf8Aje", "XK2UvKUbjomdblnolN92xCkpahmDA5wx2mBIRilv");

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope) {

})


.controller('AppCtrl', function($scope, $rootScope) {


  $scope.items = [
    { id: 'Home', icon: 'ion-android-home', link: '#/app/dash'},
    { id: 'Family', icon: 'ion-ios-people', link: '#/app/Family'},
    { id: 'Events', icon: 'ion-calendar', link: '#/app/Events'},
    { id: 'Personal', icon: 'ion-person', link: '#/app/Personal'},
    { id: 'Alerts', icon: 'ion-alert-circled', link: '#/app/Alerts'},
  ];
})

.controller('FamilyCtrl', function($scope, $rootScope, $ionicModal) {

  $scope.family = [
    { name: 'John Smith', desc: 'Patient\'s son', id: '0' },
    { name: 'Jane Smith', desc: 'Patient\'s daughter', id: '0' }
  ];

  $scope.$on('$ionicView.enter', function(){
    var people = Parse.Object.extend("people");
    var query = new Parse.Query(people);
    query.find({
      success: function(results) {
        $scope.family = [];
        for (var i in results) {
          var object = results[i];
          $scope.family.push({ name: object.get('name'), desc: object.get('relationship'), id: object.id});
        }
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  });

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
    var people = Parse.Object.extend("people");
    var person = new people();

    person.set("name", contact.name);
    person.set("relationship", contact.desc);

    person.save(null, {
      success: function(person) {
        //
      },
      error: function(person, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
    $scope.family.push(contact);
    $scope.modal.hide();
  }

  $scope.showDelete = false;

  $scope.onItemDelete = function(person) {
    var people = Parse.Object.extend("people");
    var query = new Parse.Query(people);
    query.get(person.id, {
      success: function(yourObj) {
        yourObj.destroy({});
      },
      error: function(object, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
    $scope.family.splice($scope.family.indexOf(person), 1);
  };

})

.controller('EventsCtrl', function($scope, $rootScope, $ionicModal) {

  $scope.events = [
    { day: 'yesterday', name: 'Playing League', desc: 'Got challenjour with ap leesong support', location: 'Philadelphia' },
    { day: 'today', name: 'Listeing to music', desc: 'Some of these songs are really good', location: 'UPenn' },
    { day: 'tomorrow', name: 'Baking', desc: 'Baking food and stuff', location: 'Dallas, Texas' },
  ];

  $scope.$on('$ionicView.enter', function(){
    var events = Parse.Object.extend("events");
    var query = new Parse.Query(events);
    query.find({
      success: function(results) {
        $scope.events = [];
        for (var i in results) {
          var object = results[i];
          $scope.events.push({ name: object.get('title'), location: object.get('location'), day: object.get('day_type'), desc: object.get('desc'), id: object.id});
        }
        $scope.eventDays = eventDayUpdates();
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  });


  var days = ['yesterday', 'today', 'tomorrow'];

  function eventDayUpdates() {
    var eventDays = {};
    for (day in days) {
      eventDays[days[day]] = [];
      for (event in $scope.events) {
        try {
          if (days[day] === $scope.events[event].day.toLowerCase()) {
            eventDays[days[day]].push($scope.events[event]);
          }
        } catch (err) {
          console.log(err);
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
    var events = Parse.Object.extend("events");
    var query = new Parse.Query(events);
    query.get(event.id, {
      success: function(yourObj) {
        yourObj.destroy({});
      },
      error: function(object, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
    console.log(event);
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
    var events = Parse.Object.extend("events");
    var newEvent = new events();

    newEvent.set("title", event.name);
    newEvent.set("desc", event.desc);
    newEvent.set("day_type", event.day.toLowerCase());
    newEvent.set("location", event.location);

    newEvent.save(null, {
      success: function(person) {
        event.id = newEvent.id;
      },
      error: function(person, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });

    $scope.events.push(event);
    $scope.eventDays = eventDayUpdates();
    $scope.modal.hide();
  }

})

.controller('AlertsCtrl', function($scope, $rootScope) {

})

.controller('PersonalCtrl', function($scope, $rootScope) {

});
