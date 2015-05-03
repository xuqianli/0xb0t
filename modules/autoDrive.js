var fs = require("fs");
var arduino
exports.getDirections = function (arduinoConnection) {
  arduino = arduinoConnection;
  return drive ();
}

var drive = function () {
  var gpsAverage = trimCoords();
  var correctPosition = false;
  var id = 0;
  for (var i = 0; i < gpsAverage.length; i++) {
    while (!correctPosition){
      correctPosition = directrions(gpsAverage[i]);
    }
    
  }
}

var directrions = function (initDestination){
  var initCoord = gpsCoords ();
  var initLatDiff = Math.abs(initCoord[0] - initDestination[0]); // y coord
  var initLonDiff = Math.abs(initCoord[1] - initDestination[1]); // x coord
  
  console.log ('Initial Forward Action -------- u');
  arduinoCommand ('u');

  var checkPoint = gpsCoords ();
  var cpLatDiff = Math.abs(checkPoint[0] - initDestination[0]); // y coord
  var cpLonDiff = Math.abs(checkPoint[1] - initDestination[1]); // x coord

  if (cpLatDiff > cpLonDiff){
    if (cpLatDiff > initLatDiff){
      arduinoCommand ('r');
      return false;
    } else {
      return false;
    }
  } else if (cpLatDiff < cpLonDiff) {
    if (cpLonDiff > initLonDiff) {
      arduinoCommand ('r');
      return false;
    } else{
      return false;
    }
  } else if (cpLonDiff == 0 && cpLatDiff ==0){
    return true;
  }

}

var arduinoCommand = function (dir, delay){
  arduino.writeDirection (dir); 
  arduino.writeDirection ('s'); 
}

// trims the latitude and longitude to smooth the robot path
var trimCoords = function () {
  var coordinates = readCoordinate ();  
  var average = [];

  // set initial average 
  average[0]=[];

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
  return result;
} 

var gpsCoords = function (){
  var addon = require('./gps/build/Release/gpsAddon');
  var gps = addon('start');
  var line = '';
  var coords;
  var coordinates = [];

  line = gps.coordinates;
  coords = line.toString().split(',');
  coordinates[0] = (parseFloat(coords[0])).toFixed(5);
  coordinates[1] = (parseFloat(coords[1])).toFixed(5); 
  return coordinates;
}

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}
