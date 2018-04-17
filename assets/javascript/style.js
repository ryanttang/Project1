$(document).ready(function() {
   
    window.initMap = function(){
        var losangeles = {lat: 34.07, lng: -118.24};
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




