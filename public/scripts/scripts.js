console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}
var operationChosen = false;

/// == Function Declarations == ///
function doCalc(){
  emptyInfo();
  if (verbose) {console.log('in doCalc');}
  var calcEntry = $('#currentDisplay').html();

  // if nothing has been entered,
  if (calcEntry==='Enter calculation') {
    // then show an informational message and take no further action
    $('#infoMessage').html('Please enter a calculation');
  } else { // something has been entered
    var calcArray = calcEntry.split(" "); // split the entry on " " character
    var calcLength = calcArray.length; // record the length of the array
    if (verbose) {console.log('calcArray:', calcArray);}
    var num1=calcArray[0]; // assign num1 to check for '.' entry

    // if num1 is just a dot...
    if (num1==='.'){
      num1 = 0; //... then change it to 0
    }

    // if calcArray only came through with one number
    if (calcLength<2 && $.isNumeric(num1)) {
      // then display the simple 'equation'
      $('#historyDisplay').prepend('<p>'+num1+' = '+num1+'</p>');
      // and clear the fields
      clearFields();
      // else if there are more than three elements in the array
    } else if (calcLength>3){
      // then something went horribly wrong
      $('#infoMessage').html('Internal Error - Please contact Site Administrator');
      // otherwise do an actual calculation
    } else {
      // grab the operator first
      var operator = calcArray[1];
      // if somehow there are only two items in the array, add a blank third
      if (calcLength===2){
        calcArray[2]='';
      }
      // grab the third element in the equation and set it to zero if appropriate
      var num2 = calcArray[2];
      if (num2==='' || num2==='.') {
        num2 = '0';
      }
      if (verbose) {console.log('Values: ', num1, operator, num2);}

      // First, check for division by zero
      if (operator === '/' && num2 === '0')  {
        // reset currentDisplay to be ready for new num2
        $('#currentDisplay').html(num1+' '+operator+' ');
        // set the error message
        $('#infoMessage').html('Division by Zero Error - Please enter a valid divisor');
        // otherwise, check for entries with multiple '.'
      } else if (!$.isNumeric(num1) || !$.isNumeric(num2)) {
        // reset the currentDisplay
        $('#currentDisplay').html('Enter calculation');
        // set the error message
        $('#infoMessage').html('Invalid Number Alert - Please use only one . per number');
        // reset the flag to allow new operator to be entered
        operationChosen = false;
        // finally everything looks good, so prepare the ajax call
      } else {
        // declare variables
        var calcUrl;
        var validRoute = true;
        // set route
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
          validRoute = false;
          $('#infoMessage').html('Error choosing route - Please contact Site Administrator');
        }

        if (validRoute){
          // package the calculation
          var calcToSend={
            numA: num1,
            operation: operator,
            numB: num2
          };
          // ajax post code that sends object to /routename route
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
          // reset the calculator for the next calculation
          clearFields();
        }
      }
    }
  }
} // end function doCalc

function clearFields(){
  if (verbose) {console.log('in clearFields');}
  // clear all fields
  $('#currentDisplay').html('Enter calculation');
  // reset the flag to allow a new operator to be chosen
  operationChosen = false;
  // clear the info field
  emptyInfo();
}

function emptyInfo(){
  if (verbose) {console.log('in emptyInfo');}
  // clear info field
  $('#infoMessage').html('');
}

function displayNum(){
  emptyInfo();
  // check which digit was clicked
  var whichDigit=$(this).data('digit');
  if (verbose) {console.log('in displayNum with:',this,whichDigit);}
  // get the current string in the display
  var currentString = $('#currentDisplay').html();
  // record the length of the currentString
  var strLength = currentString.length;

  // check to see if an operation has been chosen to prevent multiple operations
  // if there is a space at the end
  if (currentString.charAt(strLength-1)===' '){
    // then an operation has been chosen and we should set the flag to true
    operationChosen = true;
  }

  // if nothing has been entered yet
  if (currentString==='Enter calculation'){
    // set the display to the the current digit chosen
    $('#currentDisplay').html(whichDigit);
  } else {
    // otherwise append the current digit chosen to the currentDisplay
    $('#currentDisplay').append(whichDigit);
  }
}

// This function will display the currently chosen operation
function displayOp() {
  // first clear any info messages
  emptyInfo();
  // Grab the chosen operator
  var whichOp=$(this).data('op');
  if (verbose) {console.log('in displayOp with:',this,whichOp);}
  // get the current string
  var currentString = $('#currentDisplay').html();
  // record the length of current string
  var strLength = currentString.length;

  // if nothing has been entered yet
  if (currentString === 'Enter calculation'){
    // assume that the users wants to operate on 0
    $('#currentDisplay').html('0 '+whichOp);
  // else check to see if another operation was just chosen
  } else if (currentString.charAt(strLength-1)===' '){
    // then grab the string before that operator
    $('#currentDisplay').html(currentString.substring(0,strLength-2));
    // and then add the new operator to change the operation
    $('#currentDisplay').append(whichOp+' ');
  // otherwise if an operator was already chosen before the # at string end
  } else if (operationChosen) {
    // update the info message to alert the user
    $('#infoMessage').html('Only one operation per calcuation');
  // otherwise this is the first operation entered
  } else {
    // so just add it to the current string
    $('#currentDisplay').append(' '+whichOp+' ');
  }
}

/// == JavaScript == ///
// When the document is ready
$(document).ready(function(){
  console.log('Document ready!');

  // Be ready for a click on the = button and execute doCalc on button click
  $('#equalsButton').on('click',doCalc);

  // Be ready for a click on the clear button and execute clearFields on button click
  $('#clearButton').on('click',clearFields);

  // Be ready for a click on the = button and execute displayNum on button click
  $('.numButton').on('click',displayNum);

  // Be ready for a click on the = button and execute displayOp on button click
  $('.operatorButton').on('click',displayOp);

}); // end document ready
