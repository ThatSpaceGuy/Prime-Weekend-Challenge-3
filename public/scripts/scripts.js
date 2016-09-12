console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}
var operationChosen = false;

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

function clearField(){
  if (verbose) {console.log('in clearFields');}
  // clear all fields
  $('#currentDisplay').html('Enter equation');
}

function emptyInfo(){
  if (verbose) {console.log('in emptyInfo');}
  // clear info field
  $('#infoMessage').html('');
}

function displayNum(){
  emptyInfo();
  var whichDigit=$(this).data('digit');
  if (verbose) {console.log('in displayNum with:',this,whichDigit);}
  var currentString = $('#currentDisplay').html();
  var strLength = currentString.length;

  // check to see if an operation has been chosen
  // to prevent multiple operations
  if (currentString.charAt(strLength-1)===' '){
    operationChosen = true;
  }

  if (currentString==='Enter equation'){
    $('#currentDisplay').html(whichDigit);
  } else {
    $('#currentDisplay').append(whichDigit);
  }
}

function displayOp() {
  emptyInfo();
  var whichOp=$(this).data('op');
  if (verbose) {console.log('in displayOp with:',this,whichOp);}
  var currentString = $('#currentDisplay').html();
  var strLength = currentString.length;

  if (currentString === 'Enter equation'){
    $('#currentDisplay').html('0 '+whichOp);
  } else if (currentString.charAt(strLength-1)===' '){
    $('#currentDisplay').html(currentString.substring(0,strLength-2));
    $('#currentDisplay').append(whichOp+' ');
  } else if (operationChosen) {
    $('#infoMessage').html('Only one operation per calcuation');
  } else {
    $('#currentDisplay').append(' '+whichOp+' ');
  }
}

/// == JavaScript == ///

$(document).ready(function(){
  console.log('Document ready!');

  $('#equalsButton').on('click',sendCalc);

  $('#clearButton').on('click',clearField);

  $('.numButton').on('click',displayNum);

  $('.operatorButton').on('click',displayOp);

}); // end document ready
