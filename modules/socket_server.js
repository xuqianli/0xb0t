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
var command = 's';
var oldCommand;

// true means obstacles ahead 
var forwardObstacle = false;
var backwardObstacle = false;
var leftObstacle = false;
var rightObstacle = false;

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
    arduino.response(); 
  });
} 

exports.updateDistance = function (distance) {
  sockets.emit ('update distance', distance);

  switch(distance.substring(0, 3)){
    case '#1:':
      distance1 = distance.substring(3);
      if (distance1 == 'over') {
        distance1 = 100;
      } else {
        distance1 = parseInt(distance.substring(3));
      }
      break;
    case '#2:':
      distance2 = distance.substring(3);
      if (distance2 == 'over') {
        distance2 = 100;
      } else {
        distance2 = parseInt(distance.substring(3));
      }
      break;
    case '#3:':
      distance3 = distance.substring(3);
      if (distance3 == 'over') {
        distance3 = 100;
      } else {
        distance3 = parseInt(distance.substring(3));
      }
      break;
  }  
  console.log ('distance1: ' + distance1);
  //console.log ('switch case for command: ' + command);
  //console.log ('autoStopCheckForward: ' + autoStopCheckForward ());
  console.log ('commnad: ' + command);
  switch(command){
    case 'u':
      console.log ('pressed u');
      if (autoStopCheckForward()){
       // forwardObstacle = false;
      } else {
        command = 's';
       // forwardObstacle = true;
        console.log ('autoStopCheckForward');
      }      
      break;
    case 'd':
      if (autoStopCheckBackward()){
        backwardObstacle = false;
      } else {
        command = 's';
        backwardObstacle = true;
        console.log ('autoStopCheckBackward');
      }    
      break;      
    case 'l':
      if (autoStopCheckLeft()){
        leftObstacle = false;
      } else {
        command = 's';
        leftObstacle = true;
        console.log ('autoStopCheckLeft');
      }    
      break; 
    case 'r':
      if (autoStopCheckRight()){
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
  
  if (command != oldCommand){
    arduino.writeDirection (command);  
    oldCommand = command;
  } else {
    console.log ('same command');
  }
  

}

/*
  Socket Events Lists
*/

recieveDirections = function (socket) {
  socket.on('keydown', function(dir) {
    console.log ("keydown");
       
    switch(dir){
      case 'up':
      //  console.log ('autoStopCheckForward ' + autoStopCheckForward ());
        if (autoStopCheckForward ()){
          command = 'u';
        } else {
          command = 's';
        }   
        break;

      case 'down':
        if (autoStopCheckBackward ()){
          command = 'd';
        } else {
          command = 's';
        }
        break;
      
      case 'left':
        if (autoStopCheckLeft ()){
          command = 'l';
        } else {
          command = 's';
        }
        break;

      case 'right':
        if (autoStopCheckRight ()){
          command = 'r';
        } else {
          command = 's';
        }
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

autoStopCheckLeft = function () {
  if (distance3>= 60) {
    return true
  } else {
    return false
  }
}

autoStopCheckRight = function () {
  if (distance1>= 60) {
    return true
  } else {
    return false
  }
}



