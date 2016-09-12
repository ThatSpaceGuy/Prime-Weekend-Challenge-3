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

// post routes to receive information from client
app.post('/addition', urlEncodedParser, function(req,res){
  var calcRequest = req.body;
  console.log('Route calculate hit with', calcRequest);
  var x = Number(calcRequest.numA);
  var y = Number(calcRequest.numB);
  var calcAns = x + y; // variable for answer

  var calcResponse = {
    calcAnswer: x+' + '+y+' = '+calcAns
  };

  res.send(calcResponse);
});

app.post('/subtraction', urlEncodedParser, function(req,res){
  var calcRequest = req.body;
  console.log('Route calculate hit with', calcRequest);
  var x = Number(calcRequest.numA);
  var y = Number(calcRequest.numB);
  var calcAns = x - y; // variable for answer

  var calcResponse = {
    calcAnswer: x+' - '+y+' = '+calcAns
  };

  res.send(calcResponse);
});

app.post('/multiplication', urlEncodedParser, function(req,res){
  var calcRequest = req.body;
  console.log('Route calculate hit with', calcRequest);
  var x = Number(calcRequest.numA);
  var y = Number(calcRequest.numB);
  var calcAns = x * y; // variable for answer

  var calcResponse = {
    calcAnswer: x+' * '+y+' = '+calcAns
  };

  res.send(calcResponse);
});

app.post('/division', urlEncodedParser, function(req,res){
  var calcRequest = req.body;
  console.log('Route calculate hit with', calcRequest);
  var x = Number(calcRequest.numA);
  var y = Number(calcRequest.numB);
  var calcAns = x / y; // variable for answer

  var calcResponse = {
    calcAnswer: x+' / '+y+' = '+calcAns
  };

  res.send(calcResponse);
});
