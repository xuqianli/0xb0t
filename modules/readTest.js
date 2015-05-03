exports.getDirections = function (arduinoConnection) {
  arduino = arduinoConnection;
  for (var i = 0; i < 5; i++) {
  	console.log ('up ------ ' + i);
  	arduino.writeDirection ('u');
  	// sleep(1000);
  	console.log ('stop ------ ' + i);
  	arduino.writeDirection ('r'); 
  	// sleep(1000);
  }
}

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}
