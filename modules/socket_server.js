
/*
  Global Variables
*/
var sockets; // for initializing the connection
var arduino = require('./serial_communication');
var activeUser;
var recieveDirections;

/*
  Public API
*/

exports.init = function(io){
  
  sockets = io.sockets;
  sockets.on('connection', function (socket) {
    // only allow the most recent connected user to control the arduino //
    socket.emit('connected-to-server' );
    console.log ('connected to the server');
    // socket.on('keydown', function(dir) {
    //   console.log (dir);
    // });
    recieveDirections (socket);
  });
} 

exports.updateDistance = function (distance) {
  sockets.emit ('update distance', distance);
}

/*
  Socket Events Lists
*/

recieveDirections = function (socket) {
  socket.on('keydown', function(dir) {
    switch(dir){
     case 'up':
        console.log ('up'); // 117
        command = 'u'; 
        break;
      case 'down':
        console.log ('down'); // 100
        command = 'd';
        break;
      case 'left':
        console.log ('left'); // 108
        command = 'l';
        break;
      case 'right':
        console.log ('right'); // 114
        command = 'r';
        break;
    }
    arduino.writeDirection (command);
    arduino.response();
    
  });

  socket.on('keyup', function(dir){ // 115
    console.log ('stop');
    command = 's';
    arduino.writeDirection (command);
    //arduino.response();

    
  });
}



