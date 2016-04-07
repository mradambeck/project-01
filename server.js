////////////////////////////
// SERVER SIDE JAVASCRIPT //
////////////////////////////


// setup express
var express = require('express'),
  db = require('./models'),
  app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

console.log('server.js is running');


////////////
// ROUTES //
////////////

// HTML Endpoints

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// JSON API Endpoints

// TODO: Make api/sanity endpoint
app.get('/api/sanity', function sanity(req, res){
  res.json({
    message: "server.js: api/sanity running"
  });
});


////////////
// SERVER //
////////////

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
