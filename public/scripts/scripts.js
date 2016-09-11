console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}

/// == Function Declarations == ///
function sendCalc(){
  if (verbose) {console.log('in sendCalc');}

  var num1 = Number($('#numOne').val());
  var operator = $('#operatorButton').val();
  var num2 = Number($('#numTwo').val());

  if (verbose) {console.log('Values: ', num1, operator, num2);}

  // ajax post code that sends object to /routename route
  var calcToSend={
    numA: num1,
    operation: operator,
    numB: num2
  };

  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: calcToSend,
    success: function( data ){
      var calcResult = data.calcAnswer
      if (verbose) {console.log( 'got this from server - ' + data.calcAnswer );}


      $('#showAnswer').html(calcResult);
    }
  }); // end Ajax post code

}

/// == JavaScript == ///

$(document).ready(function(){
  console.log('Document ready!');

  $('#equalsButton').on('click',sendCalc);

}); // end document ready
