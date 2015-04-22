var addon = require('./build/Release/gpsAddon');
var gps = addon('start');

export.getDirections = function (input) {

  return drive (input);
}

var drive = function (routeCoord) {
  routeCoord = routeCoord.split(', ');
  var coordinates = gps.coordinates.split (',');
  

  return direction
}



