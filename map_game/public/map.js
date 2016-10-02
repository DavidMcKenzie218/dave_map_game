var Map = function(container, coords, zoom, scroll){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'satellite',
    disableDefaultUI: true
  });
  this.googleMap.setOptions({draggable: true, zoomControl: scroll, scrollwheel: scroll, disableDoubleClickZoom: true});
  this.guess = false;
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
      this.guess = this.isClose(position, correctAnswer);
    }.bind(this))
    return this.guess;
   },
  isClose: function(guess, answer){
    var diffLat = Math.abs(guess.lat - answer.lat);
    var diffLng = Math.abs(guess.lng - answer.lng);
    console.log(diffLat);
    console.log(diffLng);
    if(diffLat < 20){
      if(diffLng < 20){
        return true;
      }
    }
    return false;
  }
}