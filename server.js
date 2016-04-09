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
  console.log('server.js: app.get events/:id');
  res.sendFile(__dirname + '/views/event.html');
});

// JSON API Endpoints

app.get('/api/events', controllers.events.index);
app.get('/api/events/:id', controllers.events.show);

// CREATE EVENT via form
app.post('/events', function createEvent(req, res){
    console.log('server.js, /events:');
    console.log(req.body);
      var newActivity = new db.Activity({
        name: req.body.activityname
      });

      var newEvent = new db.Event({
        name: req.body.name,
        date: req.body.date,
        activity: newActivity
      });

      newEvent.save(function handleDBSave(err, data){
        if (err){
          console.log('handleDBSave err: ', err);
          return res.status(400).send({error: err});
        }
        console.log('server.js, newEvent data:');
        console.log(data);
        console.log('trying to redirect...');
        res.redirect('/events/' + data._id);
      });


    // });

});


////////////
// SERVER //
////////////

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
