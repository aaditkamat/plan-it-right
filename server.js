// server.js
// where your node app starts

// init project
var express = require('express');
var https = require('https');
var app = express();
var fs = require('fs');

/* 
//This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('https://code.jquery.com/jquery-1.10.2.js'),
  cert: fs.readFileSync('https://github.com/nodejs/node/blob/master/test/fixtures/keys/agent2-cert.pem')
}; */

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname+'/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
