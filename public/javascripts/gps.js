$(
  function () {

  var socket = io.connect();
    // the w key
  $('#gps').parent().on('click','#gps', function () {
    gMode = false;
    $('#gps').text('GPS');
    $('#gps').attr('id', 'Manual'); 
    socket.emit('autoDrive', 'start');
  });
  $('#gps').parent().on('click','#Manual',function () {
    gMode = true;
    $('#Manual').text('Manual');
    $('#Manual').attr('id', 'gps'); 
  });
  }
);