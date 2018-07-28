// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const path = require('path');

//from the php-express docs: https://www.npmjs.com/package/php-express
var phpExpress = require('php-express')({

  // assumes php is in your PATH
  binPath: 'php'
});

// set view engine to php-express
app.set('views', './public');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'views/index.html'));
});

// listen for requests :)
// eslint-disable-next-line no-process-env
 var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('PHPExpress app is listening on port ' + listener.address().port);
 });



