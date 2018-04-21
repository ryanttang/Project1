// window.initMap = function () {
//     var losangeles = { lat: 34.07, lng: -118.24 };
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 14,
//         center: losangeles
//     });
//     var marker = new google.maps.Marker({
//         position: losangeles,
//         map: map
//     });
// // }
// var events = $(this).attr("data-name");

// var eventsArray = [];


function renderButtons() {

  $("list-group-item").empty();

  for (var i = 0; i < eventsArray.length; i++) {

    var eventList = $("<li>");
    // Adding a class of movie-btn to our button
    eventList.addClass("eventListArray");
    // Adding a data-attribute
    eventList.attr("data-name", eventsArray[i]);
    // Providing the initial button text
    eventList.text(eventsArray[i]);
    // Adding the button to the buttons-view div
    $("list-group-item").append(eventList);
    console.log(eventList);
  }
}

$("#add-event").on("click", function (event) {
  event.preventDefault();
  var eventsListArray = $("#event-input").val().trim();
  eventsArray.push(eventsListArray);
  renderButtons();
});
console.log(eventsArray);

renderButtons();




s

//map


var geo = navigator.geolocation;
var losangeles = { lat: 34.07, lng: -118.24 };
function initMap() {
  var markerArray = [];

  // Instantiate a directions service.
  var directionsService = new google.maps.DirectionsService;
  // var losangeles = { lat: 34.07, lng: -118.24 };
  // Create a map and center it on Manhattan.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: losangeles
  });

  // Create a renderer for directions and bind it to the map.
  var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(
    directionsDisplay, directionsService, markerArray, stepDisplay, map);
  // Listen to change events from the start and end lists.
  var onChangeHandler = function () {
    calculateAndDisplayRoute(
      directionsDisplay, directionsService, markerArray, stepDisplay, map);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsDisplay, directionsService,
  markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'WALKING'
  }, function (response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      document.getElementById('warnings-panel').innerHTML =
        '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response, markerArray, stepDisplay, map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
      stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function () {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}



//process of events

function authenticate() {
  gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/calendar" })
    .then(function () { console.log("Sign-in successful"); },
      function (err) { console.error("Error signing in", err); });
}

function loadClient() {
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}


// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  gapi.client.calendar.events.insert({
    "calendarId": "sarah.orines@gmail.com",
    "conferenceDataVersion": "0",
    "maxAttendees": "20",
    "sendNotifications": "true",
    "supportsAttachments": "false",
    "alt": "json",
    "prettyPrint": "true",
    "itemsTagName": "li",
    "upcomingSelector": '#events-upcoming',
    "pastSelector": '#events-past',
    "recurringEvents": true,
    "upcomingHeading": '<h2>Upcoming events</h2>',
    "pastHeading": '<h2>Past events</h2>',
    "resource": {
      "end": {
        "dateTime": "2018-05-28T17:00:00-07:00",
        "timeZone": "America/Los_Angeles"
      },
      "start": {
        "dateTime": "2018-04-28T17:00:00-07:00",
        "timeZone": "America/Los_Angeles"
      },
      "reminders": {
        "useDefault": false
      }
    }

  })
    .then(function (response) {
      var results = response.data;
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
      for (var i = 0; i < results.length; i++) {

        var eventDiv= $("#events");

        var start = results[i].execute();
        console.log(start);

var li = $("<li>").text("Start: " + start);

$("#events").prepend(eventDiv);

      }
    });
}




//   }
// }





var CLIENT_ID = "305748773277-4cfenu3n2h059od6rlbcgbljovnq8gim.apps.googleusercontent.com";
var API_KEY = "AIzaSyDm6hH_-PvmGp8TuOtxIiEdW0LeneviYeI";
// // var queryURL = "https://www.googleapis.com/calendar/v3/calendars/<CALENDAR_EMAIL>/events?key=" + API_KEY

      // Client ID and API key from the Developer Console
      // var CLIENT_ID = '305748773277-4cfenu3n2h059od6rlbcgbljovnq8gim.apps.googleusercontent.com';
      // var API_KEY = 'AIzaSyDm6hH_-PvmGp8TuOtxIiEdW0LeneviYeI';

      // Array of API discovery doc URLs for APIs used by the quickstart
      // var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];




      // {
      //   "kind": "calendar#event",
      //   "etag": "\"3048063378421000\"",
      //   "id": "ol7r1i2fedm3st9o9m0nm4d6ng",
      //   "status": "confirmed",
      //   "htmlLink": "https://www.google.com/calendar/event?eid=b2w3cjFpMmZlZG0zc3Q5bzltMG5tNGQ2bmcgc2FyYWgub3JpbmVzQG0",
      //   "created": "2018-04-18T06:08:09.000Z",
      //   "updated": "2018-04-18T06:08:09.229Z",
      //   "creator": {
      //    "email": "sarah.orines@gmail.com",
      //    "displayName": "sarah orines",
      //    "self": true
      //   },
      //   "organizer": {
      //    "email": "sarah.orines@gmail.com",
      //    "displayName": "sarah orines",
      //    "self": true
      //   },
      //   "start": {
      //    "dateTime": "2018-04-28T17:00:00-07:00",
      //    "timeZone": "America/Los_Angeles"
      //   },
      //   "end": {
      //    "dateTime": "2018-05-28T17:00:00-07:00",
      //    "timeZone": "America/Los_Angeles"
      //   },
      //   "iCalUID": "ol7r1i2fedm3st9o9m0nm4d6ng@google.com",
      //   "sequence": 0,
      //   "reminders": {
      //    "useDefault": false
      //   }
      //  }