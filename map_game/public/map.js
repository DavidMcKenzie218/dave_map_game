var Map = function(container, coords, zoom, scroll){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'satellite',
    disableDefaultUI: true
  });
  this.googleMap.setOptions({draggable: true, zoomControl: scroll, scrollwheel: scroll, disableDoubleClickZoom: true});

  this.centerAt = function(destLat, destLng){
    this.googleMap.setCenter({lat:destLat, lng:destLng});
  }

  this.addMarker = function(input){
    var marker = new google.maps.Marker({
      position: {lat: input.latlng[0], lng: input.latlng[1]},
      map: this.googleMap
    });
  }

}