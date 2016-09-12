console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}
var operationChosen = false;

/// == Function Declarations == ///
function doCalc(){
  emptyInfo();
  if (verbose) {console.log('in doCalc');}
  var calcEntry = $('#currentDisplay').html();

  if (calcEntry==='Enter calculation') {
    $('#infoMessage').html('Please enter a calculation');
  } else {
    var calcArray = calcEntry.split(" ");
    var calcLength = calcArray.length;
    if (verbose) {console.log('calcArray:', calcArray);}
    var num1=calcArray[0];

    if (num1==='.'){
      num1 = 0;
    }

    if (calcLength<2 && $.isNumeric(num1)) {
      $('#historyDisplay').prepend('<p>'+num1+' = '+num1+'</p>');
      clearFields();
    } else if (calcLength>3){
      $('#infoMessage').html('Internal Error - Please contact Site Administrator');
    } else {
      var operator = calcArray[1];
      if (calcLength===2){
        calcArray[2]='';
      }
      var num2 = calcArray[2];
      if (num2==='' || num2==='.') {
        num2 = '0';
      }
      if (verbose) {console.log('Values: ', num1, operator, num2);}

      if (operator === '/' && num2 === '0')  {
        $('#currentDisplay').html(num1+' '+operator+' ');
        $('#infoMessage').html('Division by Zero Error - Please enter a valid divisor');
      } else if (!$.isNumeric(num1) || !$.isNumeric(num2)) {
        $('#currentDisplay').html('Enter calculation');
        $('#infoMessage').html('Invalid Number Alert - Please use only one . per number');
      } else {
        // ajax post code that sends object to /routename route
        var calcUrl;

        switch (operator) {
          case '+':
          calcUrl = '/addition';
          break;
          case '-':
          calcUrl = '/subtraction';
          break;
          case '*':
          calcUrl = '/multiplication';
          break;
          case '/':
            calcUrl = '/division';
          break;
          default:
        }

        var calcToSend={
          numA: num1,
          operation: operator,
          numB: num2
        };

        $.ajax({
          type: 'POST',
          url: calcUrl,
          data: calcToSend,
          success: function( data ){
            var calcResult = data.calcAnswer;
            if (verbose) {console.log( 'got this from server - ' + calcResult );}
            $('#historyDisplay').prepend('<p>'+calcResult+'</p>');
          }
        }); // end Ajax post code

        clearFields();
      }
    }
  }
} // end function doCalc

function clearFields(){
  if (verbose) {console.log('in clearFields');}
  // clear all fields
  $('#currentDisplay').html('Enter calculation');
  operationChosen = false;
  emptyInfo();
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

  if (currentString==='Enter calculation'){
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

  if (currentString === 'Enter calculation'){
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

  $('#equalsButton').on('click',doCalc);

  $('#clearButton').on('click',clearFields);

  $('.numButton').on('click',displayNum);

  $('.operatorButton').on('click',displayOp);

}); // end document ready
