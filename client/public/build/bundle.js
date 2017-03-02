/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(1);
var ParkingPlaceManager = __webpack_require__(2);

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

      this.zoom = 18;
    } else {
      this.zoom = 13;
    }
  }

}

module.exports = UI;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var MapWrapper = function(coords, zoom, container){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
  });
};

MapWrapper.prototype = {
  getUserLocation: function(callback){
    console.log("getting user location");
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.coords = new google.maps.LatLng(lat, lng);
        this.googleMap.setCenter(this.coords);
        this.addMarker(this.coords);
        callback(this.coords);
      }.bind(this))
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var ParkingPlaceManager = function(){

};

ParkingPlaceManager.prototype = {
  saveParkingPlace: function(parkingPlace){
    var jsonParkingPlace = JSON.stringify(parkingPlace);
    localStorage.setItem("parkingPlace", jsonParkingPlace);
  },

  loadParkingPlace: function(){
    var jsonParkingPlace = localStorage.getItem("parkingPlace");
    if(jsonParkingPlace == null || jsonParkingPlace == undefined) return null;
    return JSON.parse(jsonParkingPlace);
  }
}

module.exports = new ParkingPlaceManager();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function(){
  var ui = new UI();
};

window.onload = app;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map