var addon = require('./build/Release/gpsAddon');
var gps = addon('start');
var lazy = require("lazy"),
    fs = require("fs");
var latitude = [];
var longitude = [];

exports.getDirections = function (input) {

  return drive (input);
}

var drive = function () {
  for (var i = 0; i < latitude.length; i++) {
    console.log (latitude[i] + ' ' + longitude[i]);
  };
  return direction
}

var readCoordinate = function (filename) {
  var coords
  new lazy(fs.createReadStream('./routeCoords.txt'))
    .lines
    .forEach(function(line, i){
      coords = line.toString().split(', ');
      latitude[i] = parseFloat(coords[0])
      longitude[i] = parseFloat(coords[1])
    }
  );
}


