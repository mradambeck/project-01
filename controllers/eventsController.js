var db = require('../models');

// GET /api/events (get all events)
function index(req, res){
  //find events
  db.Event.find(function (err, events){
    if (err){
      console.log('ERR: server.js: GET /api/events: ', err);
      return res.status(400).send({error: err});}
    res.json(events);
  });
}

// GET /api/events/:id (get one event)
function show (req, res) {
  var id = req.params.id;

  db.Event.findOne({_id: id}, function (err, foundEvent){
    if (err) {console.log('eventsController, show err: ', err);
    return res.status(400).send({error: err});}
    res.json(foundEvent);
  });
}

// POST /events (create event via form)
function createEvent(req, res){
  var newActivity = new db.Activity({
    name: req.body.activityname
  });

  var newEvent = new db.Event({
    name: req.body.name,
    date: req.body.date,
    votingAllowed: req.body.votingAllowed,
    activity: newActivity
  });

  newEvent.save(function handleDBSave(err, data){
    if (err){
      console.log('handleDBSave err: ', err);
      return res.status(400).send({error: err});
    }
    res.redirect('/events/' + data._id);
  });
}

// PUT /api/events/:id (update event)
function setVotingFalse (req, res) {
  db.Event.findOne({_id: req.params.id}, function (err, foundEvent){
    console.log('setVotingFalse');
    if (err) {console.log('eventsController, setVotingFalse err: ', err);
      return res.status(404).send({error: err});
    }
    foundEvent.votingAllowed = false;
    foundEvent.save(function(err, savedEvent){
      if(err) { console.log('adding to votes failed');
        return res.status(404).send({error: err});
      }
      res.json(savedEvent);
    });
  });
}

// export public methods here
module.exports = {
  index: index,
  show: show,
  createEvent: createEvent,
  setVotingFalse: setVotingFalse
};
