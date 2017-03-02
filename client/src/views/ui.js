var MapWrapper = require("../models/mapWrapper");
var ParkingPlaceManager = require("../models/parkingPlaceManager");

var UI = function(){
  this.showGoogleMap();
  this.setupButtonOnPresses();

  //add while loop to check if geolocation = null or something
};

UI.prototype = {
  showGoogleMap: function(){
    var mapContainer = document.getElementById('map-container');
    var initialCoords = {lat:55.9468744, lng:-3.201654500000018}
    this.mapWrapper = new MapWrapper(initialCoords, 13, mapContainer);
  },

  setupButtonOnPresses: function(){
    var whereDidIParkButton = document.getElementById('where-did-i-park-container');
    whereDidIParkButton.onclick = this.moveMapToSavedLocation.bind(this);

    var parkMyCarButton = document.getElementById('park-my-car-container');
    parkMyCarButton.onclick = this.saveLocation.bind(this);
  },

  moveMapToSavedLocation: function(){
    var savedCoords = ParkingPlaceManager.loadParkingPlace();
    if(savedCoords == null){
      return
    } else {
      this.mapWrapper.moveToLocation(savedCoords);
    }
  },

  saveLocation: function(){
    var coords = this.mapWrapper.getUserLocation();
    ParkingPlaceManager.saveParkingPlace(coords);
  }

}

module.exports = UI;
