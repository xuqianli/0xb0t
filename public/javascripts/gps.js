$(function () {

  var socket = io.connect(),
  $(document).ready(function(){

    // the w key
  $('#gps').parent().on('click','#gps', function () {
    gMode = false;
    $('#gps').text('Control');
    $('#gps').attr('id', 'control'); 
  });
  $('#gps').parent().on('click','#control',function () {
    gMode = true;
    $('#control').text('GPS');
    $('#control').attr('id', 'control'); 
  });
});