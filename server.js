////////////////////////////
// SERVER SIDE JAVASCRIPT //
////////////////////////////

// setup express
var express = require('express'),
  db = require('./models'),
  app = express(),
  bodyParser = require('body-parser'),
  controllers = require('./controllers');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

console.log('server.js is running');


////////////
// ROUTES //
////////////

// HTML Endpoints

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/events/:id', function homepage (req, res) {
  res.sendFile(__dirname + '/views/event.html');
});


// JSON API Endpoints
app.get('/api/events', controllers.events.index);
app.get('/api/events/:id', controllers.events.show);
app.get('/api/events/:id/suggestions', controllers.suggestions.showSuggestions);
app.post('/events', controllers.events.createEvent);
app.post('/api/events/:id/suggestions', controllers.suggestions.createSuggestion);
// app.post('/api/events/:id/suggestions/:id', controllers.suggestions.update);


////////////
// SERVER //
////////////

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
