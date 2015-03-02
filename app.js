//------------------------------------------------------------------------------
//                           Import Node Modules
//------------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require("socket.io");
var SerialPort = require("serialport").SerialPort

var routes = require('./routes/index');
var users = require('./routes/users');

// Express
var app = express();

// Socket.io
var io = socket_io();
app.io = io;

//------------------------------------------------------------------------------
//                          Serial Port Connection
//------------------------------------------------------------------------------
var receivedData = "";
var command = process.argv[2];
var serialPort = new SerialPort("/dev/tty.usbmodem1451", {

  // baudrate is synced to Arduino
  baudrate: 9600,

  // Default settings for Arduino serial connection
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,

}, false); // this is the openImmediately flag [default is true]

// Open new event
serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');

    // Listens to incoming data
    serialPort.on('data', function(data) {
      result = data.trim();
      console.log('data received: ' + result);
      if (result === 'OK') {
          console.log('command successful');
      }
      else {
          console.log('command not successful');
      }
    });


    console.log("waiting...");
    command = command + '#'
    serialPort.write(command, function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });

  }
});


//------------------------------------------------------------------------------
//                          Socket.io Events
//------------------------------------------------------------------------------

io.sockets.on('connection', function(socket) {

  socket.on('keydown', function(dir) {
    switch(dir){
     case 'up':
        console.log ('up');
        break;
      case 'down':
        console.log ('down');
        break;
      case 'left':
        console.log ('left');
        break;
      case 'right':
        console.log ('right');
        break;
    }
  });

  socket.on('keyup', function(dir){
    console.log ('stop');
  });

});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
