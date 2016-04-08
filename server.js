////////////////////////////
// SERVER SIDE JAVASCRIPT //
////////////////////////////

// setup express
var express = require('express'),
  db = require('./models'),
  app = express(),
  bodyParser = require('body-parser');

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

app.get('/events', function homepage (req, res) {
  res.sendFile(__dirname + '/views/event.html');
});


// JSON API Endpoints

app.get('/api/sanity', function sanity(req, res){
  res.json({
    message: "server.js: api/sanity running"
  });
});

app.post('/api/events', function createEvent(req, res){
  console.log('server.js, /api/events:');
  console.log(req.body);
  var newActivity = new db.Activity({
    name: req.body.activityname
  });

  newActivity.save(function handleDBSave(err, activity){
    if (err){
      console.log('handleDBSave err: ', err);
    }
    console.log('server.js, newEvent, newActivity:');
    console.log(activity);
    var newEvent = new db.Event({
      name: req.body.name,
      date: req.body.date,
      activity: activity
    });

    newEvent.save(function handleDBSave(err, data){
      if (err){
        console.log('handleDBSave err: ', err);
      }
      console.log('server.js, newEvent data:');
      console.log(data);
      res.json(data);
    });
  });





});


////////////
// SERVER //
////////////

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
