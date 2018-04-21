var clientId = '463672788287-b7nicgrv2ldodtgq79vj7rul8615g31g.apps.googleusercontent.com';
var apiKey = 'AIzaSyDK5f1arv2v9X0DsiDMCQYe7DxElk_ivRc';

// enter the scope of current project (this API must be turned on in the Google console)
  var scopes = 'https://www.googleapis.com/auth/calendar';


// OAuth2 functions
    function handleClientLoad() {
          gapi.client.setApiKey(apiKey);
          window.setTimeout(checkAuth, 1);
       }

//To authenticate
 function checkAuth() {
   gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
       }

// This is the resource we will pass while calling api function
var resource = {
           "summary": "My Event",
           "start": {
               "dateTime": today
           },
           "end": {
               "dateTime": twoHoursLater
           },
           "description":"We are organizing events",
           "location":"US",
           "attendees":[
           {
                   "email":"attendee1@gmail.com",
                   "displayName":"Jhon",
                   "organizer":true,
                   "self":false,
                   "resource":false,
                   "optional":false,
                   "responseStatus":"needsAction",
                   "comment":"This is my demo event",
                   "additionalGuests":3
                   
           },
           {    
               "email":"attendee2@gmail.com",
                   "displayName":"Marry",
                   "organizer":true,
                   "self":false,
                   "resource":false,
                   "optional":false,
                   "responseStatus":"needsAction",
                   "comment":"This is an official event",
                   "additionalGuests":3
           }
           ],
       };

function makeApiCall(){
gapi.client.load('calendar', 'v3', function () { // load the calendar api (version 3)
               var request = gapi.client.calendar.events.insert
               ({
                   'calendarId': 'teamjotproject@gmail.com', 
// calendar ID which id of Google Calendar where you are creating events. this can be copied from your Google Calendar user view.

"resource": resource 	// above resource will be passed here
});                
