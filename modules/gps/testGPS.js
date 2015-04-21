for (x=0; x<10; x++) {
var addon = require('./build/Release/gpsAddon');
var gps = addon('hello');
console.log(gps.coordinates);
}

