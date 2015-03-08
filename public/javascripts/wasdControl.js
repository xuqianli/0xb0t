$(
// var phi = 0, flipped = 0, mirrored = 0;

// function setXformClass () {
//   $('.xform').each(function(idx,el) {
//     el.className = "xform x" +(flipped ? "-flipped":"") + (mirrored ? "-mirrored" : "") + "-rotated-" + phi;
//   });
// }
//   $(document).ready(function() {
//   // set rotation angle phi and toggle rotate class
//   $('#rotate').click(function() {
//     phi = (phi + 90) % 360;
//     setXformClass();
//     if (phi % 180) {
//       $('.xform-p').addClass('rotated');
//     } else {
//       $('.xform-p').removeClass('rotated');
//     }
//   });
//   // toggle mirror class component
//   $('#mirror').click(function() {
//     mirrored = ! mirrored;
//     setXformClass();
//   });
//   // toggle flip class component
//   $('#flip').click(function() {
//     flipped = ! flipped;
//     setXformClass();
//   });
// });


  function () {

   var socket = io.connect(),
    wIsDown = false,
    aIsDown = false,
    sIsDown = false,
    dIsDown = false;

  $(document).keydown(function(e){
    switch(e.which){
      case 87:
        if(wIsDown) return;
        wIsDown = true;
        socket.emit('keydown', 'up');
        $('#up').addClass('active');
        break;
      case 65:
        if(aIsDown) return;
        aIsDown = true;
        socket.emit('keydown', 'left');
        $('#left').addClass('active');
        break;
      case 83:
        if(sIsDown) return;
        sIsDown = true;
        socket.emit('keydown', 'down');
        $('#down').addClass('active');
        break;
      case 68:
        if(dIsDown) return;
        dIsDown = true;
        socket.emit('keydown', 'right');
        $('#right').addClass('active');
        break;
    }
  });

  $(document).keyup(function(e){
    switch(e.which){
      case 87:
        if(!wIsDown) return;
        wIsDown = false;
        socket.emit('keyup', 'up');
        $('#up').removeClass('active');
        break;
      case 65:
        if(!aIsDown) return;
        aIsDown = false;
        socket.emit('keyup', 'left');
        $('#left').removeClass('active');
        break;
      case 83:
        if(!sIsDown) return;
        sIsDown = false;
        socket.emit('keyup', 'down');
        $('#down').removeClass('active');
        break;
      case 68:
        if(!dIsDown) return;
        dIsDown = false;
        socket.emit('keyup', 'right');
        $('#right').removeClass('active');
        break;
    }
  });

  // for mouse clicks 
  $(document).ready(function(){

    // the w key
    $("button").bind('touchstart', function(){
      console.log ($(this).attr("id"));
      switch($(this).attr("id")){
        case "up":
          if(wIsDown) return;
          wIsDown = true;
          socket.emit('keydown', 'up');
          $('#up').addClass('active');
          break;
        case "left":
          if(aIsDown) return;
          aIsDown = true;
          socket.emit('keydown', 'left');
          $('#left').addClass('active');
          break;
        case "down":
          if(sIsDown) return;
          sIsDown = true;
          socket.emit('keydown', 'down');
          $('#down').addClass('active');
          break;
        case "right":
          if(dIsDown) return;
          dIsDown = true;
          socket.emit('keydown', 'right');
          $('#right').addClass('active');
          break;
        default:
          break;
      }
    }).bind('touchend', function(){
      switch($(this).attr("id")){
        case "up":
          if(!wIsDown) return;
          wIsDown = false;
          socket.emit('keyup', 'up');
          $('#up').removeClass('active');
          break;
        case "left":
          if(!aIsDown) return;
          aIsDown = false;
          socket.emit('keyup', 'left');
          $('#left').removeClass('active');
          break;
        case "down":
          if(!sIsDown) return;
          sIsDown = false;
          socket.emit('keyup', 'down');
          $('#down').removeClass('active');
          break;
        case "right":
          if(!dIsDown) return;
          dIsDown = false;
          socket.emit('keyup', 'right');
          $('#right').removeClass('active');
          break;
        default:
          break;  
      } // switch
    });

  });
});
