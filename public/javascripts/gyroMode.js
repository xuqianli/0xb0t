$(
  function () {

   var socket = io.connect(),
    wIsDown = false,
    aIsDown = false,
    sIsDown = false,
    dIsDown = false,
    alphaLock = 0,
    betaLock = 0,
    gammaLock = 0,
    alpha = 0,
    beta = 0,
    gamma = 0,
    gMode = false;

    
    if ( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
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
            document.getElementById('alpha').innerHTML = alpha;
            document.getElementById('beta').innerHTML = beta;
            document.getElementById('gamma').innerHTML = gamma;
            var gammaCheck = (gammaLock - gamma <20) && (gammaLock - gamma > -20);
            var betaCheck = (betaLock - beta < 20) && (betaLock - beta > -20);

            if (gMode) {

              if (gammaCheck && betaCheck) { // if both gamma and betta are in the stop zone then stop
                socket.emit('keyup'); 
              } else {

                if (gammaCheck) { 

                  if (betaLock - beta >= 20){
                    socket.emit('keydown', 'up');
                  } else if (betaLock - beta <= -20) {
                    socket.emit('keydown', 'down');
                  }

                } else if (betaCheck) {

                  if (gammaLock - gamma >= 20) {
                    socket.emit('keydown', 'left');
                  } else if (gammaLock - gamma <= -20) {
                    socket.emit('keydown', 'right');
                  }

                }


              }  
            }          

      },100);    
      
      //Gyro Stop and Go
      $('#stop').hide();
      $('#stop').parent().on('click','#stop', function () {
        gMode = false;
        $('#stop').text('GO');
        $('#stop').attr('id', 'start'); 
      });
      $('#stop').parent().on('click','#start',function () {
        gMode = true;
        $('#start').text('STOP');
        $('#start').attr('id', 'stop'); 
      });

      // ----------Mode selection-----------

      // Gyroscope Mode
      $('#gyroMode').parent().on('click','#gyroMode', function () {
        gMode = true; 

        alphaLock = alpha;
        betaLock = beta;
        gammaLock = gamma;

        // switch back to STOP button after clicking gyroMode 
        $('#start').text('STOP');
        $('#start').attr('id', 'stop'); 

        // Display the Stop button
        $('#stop').show();
        $('.controlWrap').hide();

        document.getElementById('alphaLock').innerHTML = alphaLock;
        document.getElementById('betaLock').innerHTML = betaLock;
        document.getElementById('gammaLock').innerHTML = gammaLock;
        
        // transitions to switch to touchMode
        $('#gyroMode').text('Touch mode');
        $('#gyroMode').attr('id', 'touchMode'); 
      });

      // Touch Mode
      $('#gyroMode').parent().on('click','#touchMode',function () {
        gMode = false;

        // Hides all Gyro Stop/Go
        $('#stop').hide();
        $('#start').hide();
        // reveal the wasd control after switch
        $('.controlWrap').show();

        // transitions to switch to gyroMode
        $('#touchMode').text('Gyroscope Mode');
        $('#touchMode').attr('id', 'gyroMode');    
      });
    }
  }
);
