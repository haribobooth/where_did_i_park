var MapWrapper = require("../models/mapWrapper");
var ParkingPlaceManager = require("../models/parkingPlaceManager");

var UI = function(){
  this.mediaQuery();
  this.showGoogleMap();
  this.setupButtonOnPresses();
};

UI.prototype = {
  showGoogleMap: function(){
    var mapContainer = document.getElementById('map-container');
    var initialCoords = {lat:55.9468744, lng:-3.201654500000018}
    this.mapWrapper = new MapWrapper(initialCoords, this.zoom, mapContainer);
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
    var parkMyCarButtonText = document.querySelector('#park-my-car-container p');
    parkMyCarButtonText.innerText = "Saving location...";

    this.mapWrapper.getUserLocation(function(coords){
      ParkingPlaceManager.saveParkingPlace(coords);
      var parkMyCarButtonText = document.querySelector('#park-my-car-container p');
      parkMyCarButtonText.innerText = "Park my car!";
    });
  },

  mediaQuery: function(){
    var screenSmall = window.matchMedia( "(max-device-width: 700px)" );
    if(screenSmall.matches){
      var parkMyCarButton = document.getElementById('park-my-car-container');
      var whereDidIParkButton = document.getElementById('where-did-i-park-container');
      var mainWrapper = document.getElementById('main-wrapper');

      mainWrapper.removeChild(parkMyCarButton);
      mainWrapper.removeChild(whereDidIParkButton);

      mainWrapper.appendChild(parkMyCarButton);
      mainWrapper.appendChild(whereDidIParkButton);

      this.zoom = 17;
    } else {
      this.zoom = 13;
    }
  }

}

module.exports = UI;
