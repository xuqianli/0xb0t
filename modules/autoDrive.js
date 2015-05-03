var addon = require('./gps/build/Release/gpsAddon');
var gps = addon('start');
var fs = require("fs");

exports.getDirections = function (arduino) {
  return directrions (arduino);
}

var directrions = function (arduino) {
  var gpsAverage = trimCoords();
  var line = '';
  var coords;
  var coordinates = [];

  for (var i = 0; i < gpsAverage.length; i++) {
    line = gps.coordinates;
    coords = line.toString().split(',');
    coordinates[i] = [];
    coordinates[i][0] = parseFloat(coords[0]);
    coordinates[i][1] = parseFloat(coords[1]);
    console.log (coordinates);
  
  };
}

// trims the latitude and longitude to smooth the robot path
var trimCoords = function () {
  var coordinates = readCoordinate ();  
  var average = [];

  // set initial average 
  average[0]=[];
  // average[0][0] = ((coordinates[0][0] + coordinates[1][0] + coordinates[2][0])/3).toFixed(5); // latitude average
  // average[0][1] = ((coordinates[0][1] + coordinates[1][1] + coordinates[2][1])/3).toFixed(5); // longitude average

  for (var i = 0; i < coordinates.length; i+=3) {
    if (coordinates[i+2] != null) {
      average[i] = triCoordsAverage (coordinates[i], coordinates[i+1], coordinates[i+2]);
    }
  }
  // console.log (average);
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
var triCoordsAverage = function (number1, number2, number3) {
  var result = [];
  result[0] = ((number1[0] + number2[0] + number3[0])/3).toFixed(5);
  result[1] = ((number1[1] + number2[1] + number3[1])/3).toFixed(5);
  // console.log (result);
  // result[1] = ((average[1] * 3 - preNumber[1] + nexNumber[1])/3).toFixed(5);
  return result;
} 
