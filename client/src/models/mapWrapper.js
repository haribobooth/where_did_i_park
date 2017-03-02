var MapWrapper = function(zoom, container){
  this.getUserLocation()
  this.googleMap = new google.maps.Map(container, {
    center: this.coords,
    zoom: zoom,
  });
};

MapWrapper.prototype = {
  getUserLocation: function(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.coords = new google.maps.LatLng(lat, lng);
        this.googleMap.setCenter(this.coords);
        this.addMarker(this.coords);
      }.bind(this))
    }
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
