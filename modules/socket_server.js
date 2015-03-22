/*
  Global Variables
*/
var sockets; // for initializing the connection
var arduino = require('./serial_communication');
var activeUser;
var recieveDirections;
var distanceResponse
var autoStopCheck

// Distances
var distance1 = 0;
var distance2 = 0;
var distance3 = 0;

/*
  Constants
*/
var distanceLimit = 60; // distance limit for autoStopCheck

/*
  Public API
*/

exports.init = function(io){
  
  sockets = io.sockets;
  sockets.on('connection', function (socket) {
    // only allow the most recent connected user to control the arduino //
    socket.emit('connected-to-server' );
    console.log ('connected to the server');
    recieveDirections (socket);
  });
} 

exports.updateDistance = function (distance) {
  sockets.emit ('update distance', distance);
  var distanceRecieved = distance.substring(3);

  if (distanceRecieved == 'over') {
    distanceRecieved = 100;
  } else {
    distanceRecieved = parseInt(distance.substring(3));
  }

  switch(distance.substring(0, 3)){
    case '#1:':
      distance1 = distanceRecieved;
      break;
    case '#2:':
      distance2 = distanceRecieved;
      break;
    case '#3:':
      distance3 = distanceRecieved;
      break;
  }  

}

/*
  Socket Events Lists
*/

recieveDirections = function (socket) {
  socket.on('keydown', function(dir) {
    arduino.response();    
    switch(dir){
     case 'up':
        console.log ('up'); // 117
        if (autoStopCheckForward()){
          command = 'u'; 
        } else {
          command = 's';
          console.log ('autoStopCheckForward');
        }
        break;

      case 'down':
        console.log ('down'); // 100
        if (autoStopCheckBackward()){
          command = 'd';
        } else {
          command = 's';
          console.log ('autoStopCheckBackward')
        }
        break;

      case 'left':
        console.log ('left'); // 108
        if (autoStopCheckSides(distance3)){
          command = 'l'
        } else {
          command = 's';
          console.log ('autoStopCheckSides')
        }
        break;

      case 'right':
        console.log ('right'); // 108
        if (autoStopCheckSides(distance1)){
          command = 'r'
        } else {
          command = 's';
          console.log ('autoStopCheckSides')
        }
        break;
    }

    arduino.writeDirection (command);
  });

  socket.on('keyup', function(dir){ // 115
    console.log ('stop');
    command = 's';
    arduino.writeDirection (command);

    
  });
}

autoStopCheckForward = function () {

  if (distance1 >= 60 && distance3 >= 60) {
    return true
  } else {
    return false
  }
}

autoStopCheckBackward = function () {
  if (distance2>= 60) {
    return true
  } else {
    return false
  }
}

autoStopCheckSides = function (distance) {
  if (distance>= 60) {
    return true
  } else {
    return false
  }
}



