var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

var portDecision = process.env.PORT || 3000;

// spin up server
app.listen(portDecision, function(){
  console.log('Server is listening on heroku or port 3000');
});

// base url hit
app.get('/', function(req,res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});

// setup 'public' as a static resource
app.use(express.static('public'));

// post route to receive information from client
app.post('/calculate', urlEncodedParser, function(req,res){
  console.log('Route calculate hit with', req.body);
  var calcRequest = req.body;
  var x = calcRequest.numA;
  var y = calcRequest.numB;
  var calcAns; // variable for answer

  switch (calcRequest.operation) {
    case 'Add':
      calcAns = x + y;
    break;
    case 'Sub':
      calcAns = x - y;
    break;
    case 'Mul':
      calcAns = x * y;
    break;
    case 'Div':
      calcAns = x / y;
    break;
    default:

  }

  var calcResponse = {
    calcAnswer: calcAns
  };

  res.send(calcResponse);
});
