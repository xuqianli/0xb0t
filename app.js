//------------------------------------------------------------------------------
//                         Import Node Modules
//------------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require("socket.io");
var SerialPort = require("serialport").SerialPort

//------------------------------------------------------------------------------
//                        Serial Port Connection
//------------------------------------------------------------------------------
var receivedData = "";
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

      receivedData += data;
      console.log('data received: ' + receivedData);

      if (receivedData.indexOf('#') >= 0 && receivedData.indexOf('$') >= 0) {
        // save the data between '$' and '#'
        sendData = receivedData.substring(receivedData.indexOf('$') + 1,
        receivedData.indexOf('#'));
        console.log('data received: ' + sendData);
        receivedData = '';
	     }

    });

    serialPort.write("ls\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});





var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();




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
