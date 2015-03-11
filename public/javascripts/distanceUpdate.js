$(
  function () {

    var socket = io.connect();
 
    socket.on('update distance', function(distance){
      switch(distance.substring(0, 3)){
        case '#1:':
          console.log ('sonar 1: ' + distance.substring(3));
          document.getElementById('distance1').innerHTML = distance.substring(3);
          break;
        case '#2:':
          console.log ('sonar 2: ' + distance.substring(3));
          document.getElementById('distance2').innerHTML = distance.substring(3);   
          break;
        case '#3:':
          console.log ('sonar 3: ' + distance.substring(3));
          document.getElementById('distance3').innerHTML = distance.substring(3);   
          break;
      }    
    });

  }
)