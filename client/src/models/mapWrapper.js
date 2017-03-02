var MapWrapper = function(coords, zoom, container){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
  });
};

MapWrapper.prototype = {
  getUserLocation: function(){
    console.log("getting user location");
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.coords = new google.maps.LatLng(lat, lng);
        this.googleMap.setCenter(this.coords);
        this.addMarker(this.coords);
      }.bind(this))
      return this.coords;
    }
  },

  moveToLocation: function(coords){
    this.googleMap.setCenter(coords);
    this.addMarker(coords);
  },

  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      icon: "assets/carIcon.png"
    })
  }

}

module.exports = MapWrapper;
