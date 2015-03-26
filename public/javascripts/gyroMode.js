$(
  function () {

   var socket = io.connect(),
    wIsDown = false,
    aIsDown = false,
    sIsDown = false,
    dIsDown = false,
    mode = false,
    alphaLock = 0,
    betaLock = 0,
    gammaLock = 0,
    alpha = 0,
    beta = 0,
    gamma = 0;

  if (window.DeviceMotionEvent==undefined) {
    var elems = document.getElementsByClassName('mobile');
    for(var i = 0; i < elems.length; i++) {
      elems[i].style.display = 'none';
    }
  } 
  else {
    window.ondeviceorientation = function(event) {
            alpha = Math.round(event.alpha);
            beta = Math.round(event.beta);
            gamma = Math.round(event.gamma);
    }

    setInterval(function() {
          document.getElementById("alpha").innerHTML = alpha;
          document.getElementById("beta").innerHTML = beta;
          document.getElementById("gamma").innerHTML = gamma;
          if (mode){
            //forward or backward
            if (betaLock - beta >= 20) {
              socket.emit('keydown', 'up');
            } else if (betaLock - beta <= -20) {
              socket.emit('keydown', 'down');
            } else if (betaLock - beta < 20 && betaLock - beta > -20){
              socket.emit('keyup');
            }
            // } else if (gammaLock - gamma >= 20) {
            //   socket.emit('keydown', 'left');
            // } else if (gammaLock - gamma <= -20) {
            //   socket.emit('keydown', 'right');
            // }
            // else if (gammaLock - gamma <20 && gammaLock - gamma > -20){
            //   socket.emit('keyup');            
            // }

          }

    },100);    

    $( "#gyroMode" ).bind( "click", function() {
      mode = true; 
      alphaLock = alpha;
      betaLock = beta;
      gammaLock = gamma;
      document.getElementById("alphaLock").innerHTML = alphaLock;
      document.getElementById("betaLock").innerHTML = betaLock;
      document.getElementById("gammaLock").innerHTML = gammaLock;

    });
  }
});
