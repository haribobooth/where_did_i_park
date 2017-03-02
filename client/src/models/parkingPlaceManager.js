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
