// server.js
// where your node app starts

// init project
const express = require('express');
const  app = express();

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

/*
 * function to create a https server on Node 
 */
var createHTTPSServer = function() {
  var https = require('https');
  var fs = require('fs');

  //This line is from the Node.js HTTPS documentation.
  var options = {
    key: fs.readFileSync('public/key.pem'),
    cert: fs.readFileSync('public/cert.pem'),
    passphrase:'BearGryllsAndFedererFTW12@'
  };

  https.createServer(options, app).listen(3000);
};



