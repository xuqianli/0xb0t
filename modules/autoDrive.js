var addon = require('./gps/build/Release/gpsAddon');
var gps = addon('start');
var fs = require("fs");

exports.getDirections = function () {
  return directrions ();
}

var directrions = function () {
  var gpsAverage = trimCoords();
  // for (var i = 0; i < gpsAverage.length; i++) {
    
  // };
}

// trims the latitude and longitude to smooth the robot path
var trimCoords = function () {
  var coordinates = readCoordinate ();  
  var average = [];

  // set initial average 
  average[0]=[];
  average[0][0] = ((coordinates[0][0] + coordinates[1][0] + coordinates[2][0])/3).toFixed(5); // latitude average
  average[0][1] = ((coordinates[0][1] + coordinates[1][1] + coordinates[2][1])/3).toFixed(5); // longitude average

  for (var i = 1; i < coordinates.length; i++) {
    if (coordinates[i+1] != null) {
      average[i] = triCoordsAverage (coordinates[i], coordinates[i+1], average[i-1]);
    }
  }
  console.log (average);
  return average;
}

// Reads gps coordinates from the routCoords.txt
var readCoordinate = function () {
  var id = 0;
  var coords;
  var coordinates = [];
  fs.readFileSync('./modules/routeCoords.txt').toString().split('\n').forEach(function (line) { 
      coords = line.toString().split(', ');
      coordinates[id] = [];
      coordinates[id][0] = parseFloat(coords[0]);
      coordinates[id][1] = parseFloat(coords[1]);
      id ++;
  });
  return coordinates
}

// find the average of the three points
var triCoordsAverage = function (preNumber, nexNumber, average) {
  var result = [];
  result[0] = ((average[0] * 3 - preNumber[0] + nexNumber[0])/3).toFixed(5);
  result[1] = ((average[1] * 3 - preNumber[1] + nexNumber[1])/3).toFixed(5);
  return result;
} 
