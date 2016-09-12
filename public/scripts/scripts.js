console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}

/// == Function Declarations == ///
function sendCalc(){
  if (verbose) {console.log('in sendCalc');}
  var num1 = $('#numOne').html();
  var operator = $('#operatorButton').val();
  var num2 = $('#numTwo').html();

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
      var calcResult = data.calcAnswer;
      if (verbose) {console.log( 'got this from server - ' + data.calcAnswer );}
      $('#showAnswer').html(calcResult);
    }
  }); // end Ajax post code
} // end function sendCalc

function clearFields(){
  if (verbose) {console.log('in clearFields');}
  // clear all fields
  $('#numOne').html('Enter a number below');
  $('#numTwo').html('Enter a number below');
  $('#showAnswer').html('');
}

function displayNum(){
  if (verbose) {console.log('this:', this);}
  whichNum=$(this).data('num');
  whichDigit=$(this).data('digit');
  if (verbose) {console.log('in displayNum with:',this, whichNum, whichDigit);}

  if ($('#'+whichNum).html()==='Enter a number below'){
    $('#'+whichNum).html(whichDigit);
  } else {
    $('#'+whichNum).append(whichDigit);
  }
}

/// == JavaScript == ///

$(document).ready(function(){
  console.log('Document ready!');

  $('#equalsButton').on('click',sendCalc);

  $('#clearButton').on('click',clearFields);

  $('.numButton').on('click',displayNum);

}); // end document ready
