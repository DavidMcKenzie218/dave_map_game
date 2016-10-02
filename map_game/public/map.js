var Map = function(container, coords, zoom, scroll){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'satellite',
    disableDefaultUI: true
  });
  this.googleMap.setOptions({draggable: true, zoomControl: scroll, scrollwheel: scroll, disableDoubleClickZoom: true});
  
}

Map.prototype = {
  centerAt: function(destLat, destLng){
      this.googleMap.setCenter({lat:destLat, lng:destLng});
    },
  addMarker: function(input){
    var marker = new google.maps.Marker({
      position: {lat: input.lat, lng: input.lng},
      map: this.googleMap
    });
  },
  addClickEvent: function(correctAnswer){
       google.maps.event.addListener(this.googleMap, "click", function(event){
         var position = {lat:event.latLng.lat(), lng:event.latLng.lng()}
         this.addMarker(position);
          return isClose(position, correctAnswer);
       }.bind(this))
   },
   isClose: function(guess, answer){
    
   }
}