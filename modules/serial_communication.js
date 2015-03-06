/*
  Global Variable
*/
var SerialPort =require("serialport").SerialPort;
var socket = require('./socket_server');
var exec = require('exec');
var read;
var write;
var arduino; 
var portConnect;
var findArduino;
var findArduinoOnPi

/*
  Serial Connection Initializtion
*/

// Detects Aduino on linux
findArduinoOnLinux = function () {
  var port;

  console.log('* attempting to detect arduino on Linux computer *');

  exec('ls /dev/tty.*', function(error, stdout, stderr){
    if (stdout){
      var ports = stdout.split('\n');
      for (var i = ports.length - 1; i >= 0; i--){
        if (ports[i].search('usbmodem') != -1 || ports[i].search('usbserial') != -1) 
          port = ports[i];
      }
    }
    if (port){
      attemptConnection(port);
    }   else{
      findArduinoOnPi();
    }
  )};
}

findArduinoOnPi = function () {
  var port;

  SerialPort.list(function (err, ports) {

    ports.forEach(function(port) {

      if (obj.hasOwnProperty('pnpId')){
        // FTDI captures the duemilanove //
        // Arduino captures the leonardo //
        if (obj.pnpId.search('FTDI') != -1 || obj.pnpId.search('Arduino') != -1) {
          port = obj.comName;
        }
      }
    });

    if (port){

      portConnect(port);

    } else { 

      console.log('* failed to find arduino : please check your connections *');
    }  
  });
}

// Initializes arduino connection
portConnect = function (port) {

  console.log ('Initializing SerialPort Connection with ' + port;);

  // Create new serialPort object 
  arduino = new SerialPort(port, {
    // baudrate is synced to Arduino
    baudrate: 9600;
    // Default settings for Arduino serial connection
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  }, false);

  // Open SerialPort
  arduino.open(function (error) {

    if ( error ) {
      console.log('failed to open SerialPort: '+error);
    } else {
      console.log('SerialPort openned');
    }
  });
}

findArduinoOnLinux ();

/*
  Serial Input out/put 
*/

// Reads data from arduino
read = function (){
  var receivedData;  

  if (arduino)
  {
    arduino.on('data', function(data) {
      receivedData = data;
      console.log ('recieved data: ' + receivedData);
    });

    return data;

  } else {
    console.log ('arduino not connected');
  }
}

// Transfer data to arduino
write = function (buffer){

  if (arduino)
  {
    arduino.write(buffer, function(err, results) {
      if (err){
        console.log('error ' + err);
      }

     });
  }
}

/*
  Public API
*/





