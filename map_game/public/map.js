var Map = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'satellite',
    disableDefaultUI: true
  });
  this.googleMap.setOptions({draggable: true, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});

  this.centerAt = function(destLat, destLng){
    this.googleMap.setCenter({lat:destLat, lng:destLng});
  }

  this.addMarker = function(input){
    var info = '<h4>' + input.name + '</h4>' + 
    '<p> Captial: ' + input.capital +'</p>'+
    '<p> Population: ' + input.population + ' people</p>' + 
    '<p>Region: ' + input.region + '</p>';
    var marker = new google.maps.Marker({
      position: {lat: input.latlng[0], lng: input.latlng[1]},
      map: this.googleMap,
      // icon: image
    });
    var infowindow = new google.maps.InfoWindow({
      content: info
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
  }

}