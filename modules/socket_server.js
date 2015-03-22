/*
  Global Variables
*/
var sockets; // for initializing the connection
var arduino = require('./serial_communication');
var activeUser;

// private methods declaration
var recieveDirections;
var autoStopCheckForward;
var autoStopCheckBackward;
var autoStopCheckSides;

//variables
var distanceResponse
var command

// true means obstacles ahead 
var forwardObstacle = true;
var backwardObstacle = true;
var leftObstacle = true;
var rightObstacle = true;

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

  switch(command){
    case 'u':
      if (autoStopCheckForward()){
        command = 'u'; 
        forwardObstacle = false;
      } else {
        command = 's';
        forwardObstacle = true;
        console.log ('autoStopCheckForward');
      }      
      break; 
    case 'd':
      if (autoStopCheckBackward()){
        command = 'd'; 
        backwardObstacle = false;
      } else {
        command = 's';
        backwardObstacle = true;
        console.log ('autoStopCheckBackward');
      }    
      break;      
    case 'l':
      if (autoStopCheckSides(distance3)){
        command = 'l'; 
        leftObstacle = false;
      } else {
        command = 's';
        leftObstacle = true;
        console.log ('autoStopCheckLeft');
      }    
      break; 
    case 'r':
      if (autoStopCheckSides(distance1)){
        command = 'r'; 
        rightObstacle = false;
      } else {
        command = 's';
        rightObstacle = true;
        console.log ('autoStopCheckRight');
      }    
      break; 
    case 's':
      break;             
  }

  arduino.writeDirection (command);  

}

/*
  Socket Events Lists
*/

recieveDirections = function (socket) {
  socket.on('keydown', function(dir) {
    arduino.response();    
    switch(dir){
     case 'up':
        command = 'u';
        break;

      case 'down':  
        command = 'd';
        console.log ('down')
        break;

      case 'left':
        command = 'l';
        break;

      case 'right':
        command = 'r';
        break;
    }
  });

  socket.on('keyup', function(dir){ // 115
    console.log ('stop');
    command = 's';
    
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



