Weekend Challenge 3
===================
Instructor provided description:
Welcome to your third weekend challenge!

We are going to be building a calculator application using jQuery, Node, and Express, all hosted on Heroku!

The logic for the calculator needs to be housed on the Server, where the client side will take in the values (in 2 input text fields) and the type of mathematical operation (selected using a button on the DOM). Each of the numerical values and type of mathematical operation will be bundled up in an object and then sent to the server via a POST. So when the object is sent, it should look something like this: { x: 3, y: 4, type: Add }

Once the server receives it, build out logic to compute the numbers in 1 of 4 different ways. The server should be able to handle Addition, Subtraction, Multiplication, and Division. Once the calculation is complete, it should be sent back down to the client side app where it should be displayed on the DOM.

Finally, build a 'clear' button that resets the whole experience.

HARD MODE:
Convert the input fields for the two values to Buttons. So the experience would allow the user to click on a numerical button, then a mathematical operation, then a numerical button again. Then have an equal button that sends all of the information to the server.

PRO MODE:
Style the whole experience using Bootstrap to resemble the design of a physical calculator. Then, include decimal points in your number logic. Finally, convert your logic to have the client side handle which mathematical operation is run. Once it determines this, it will use that to change the url or the post request to pair with a server side route that handles that type of mathematical operation. For example:

$.ajax({
type: POST,
url: /division,
success: function(data){
//something here
}
});

Would be on the Client side and the Server side would have something like:

router.post('/division', function(req, res){
//some code here
});

Versioning Plan
===============
BASIC MODE
----------
* 0.1 - html/js/css/server/heroku handshake & ReadMe - initial commit
* 0.2 - HTML elements - input text fields and operation button
* 0.3 - Client JS - get info from html, bundle in a object, send to server
* 0.4 - Server JS - compute numbers: +, -, \*, /, and send back to client
* 0.5 - Client JS - receive answer and display on DOM
* 0.6 - Clear button resets the whole experience.
* 1.0 - Test app and sign off on BASIC MODE

HARD MODE
---------
* 1.1 - HTML - Convert input fields to numerical buttons and equals button
* 1.2 - Client JS - get info from buttons, and send to server on "="-click
* 2.0 - Test app and sign off on HARD MODE

PRO MODE
--------
* 2.1 - HTML - Use Bootstrap to style as a physical calculator
* 2.2 - Client JS - get info from buttons and incorporate decimal logic
* 2.3 - Sever/Client JS - Move logic for deciding operation to Client
* 2.4 - Server JS - Add 'operation routes' to execute Client requests (see ex. above)
* 3.0 - Test app and sign off on PRO MODE

EXTRA MODE
----------
* 3.1 - Add other mathematical operations (e.g. exponents)
* 3.2 - Add ability to take multiple operations in a row (like a calculator)
* 3.3 - Use Bootstrap to make Calculator responsive to different sizes
* 3.4 - Change style of number display to match real calculator
* 4.0 - Test app and sign off on EXTRA MODE
