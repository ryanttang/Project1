$(document).ready(function () {

  window.initMap = function () {
    var losangeles = { lat: 34.07, lng: -118.24 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: losangeles
    });
    var marker = new google.maps.Marker({
      position: losangeles,
      map: map
    });
  }
});




// var CLIENT_ID = "305748773277-4cfenu3n2h059od6rlbcgbljovnq8gim.apps.googleusercontent.com";
// var API_KEY = "AIzaSyDm6hH_-PvmGp8TuOtxIiEdW0LeneviYeI";
var queryURL = "https://www.googleapis.com/calendar/v3/calendars/sarah.orines@gmail.com/events?key=" + API_KEY

//Client ID and API key from the Developer Console
var CLIENT_ID = '305748773277-4cfenu3n2h059od6rlbcgbljovnq8gim.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDm6hH_-PvmGp8TuOtxIiEdW0LeneviYeI';
var SCOPES = "https://www.googleapis.com/auth/calendar";
//Array of API discovery doc URLs for APIs used by the quickstart
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    //  discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}











function authenticate() {
  return gapi.auth2.getAuthInstance()
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
  return gapi.client.calendar.events.insert({
    "calendarId": "sarah.orines@gmail.com",
    "conferenceDataVersion": "0",
    "maxAttendees": "20",
    "sendNotifications": "true",
    "supportsAttachments": "false",
    "alt": "json",
    "prettyPrint": "true",
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
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
      function (err) { console.error("Execute error", err); });
  }


// gapi.load("client:auth2", function () {
//   gapi.auth2.init({ client_id: YOUR_CLIENT_ID });
// });

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