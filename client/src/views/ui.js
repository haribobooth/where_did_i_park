var MapWrapper = require("../models/mapWrapper");

var UI = function(){
  this.showGoogleMap();
};

UI.prototype = {
  showGoogleMap: function(){
    var mapContainer = document.getElementById('map-container');
    var mapWrapper = new MapWrapper(8, mapContainer);
  },
}

module.exports = UI;
