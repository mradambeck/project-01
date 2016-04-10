var db = require('../models');

//get all events
function index(req, res){
  //find events
  db.Event.find(function (err, events){
    if (err){
      console.log('ERR: server.js: GET /api/events: ', err);
      return res.status(400).send({error: err});}
    res.json(events);
  });
}

// GET ONE EVENT
function show (req, res) {
  var id = req.params.id;

  db.Event.findOne({_id: id}, function (err, foundEvent){
    if (err) {console.log('eventsController, show err: ', err);
    return res.status(400).send({error: err});}
    res.json(foundEvent);
  });
}

// CREATE EVENT via form
function createEvent(req, res){
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
    res.redirect('/events/' + data._id);
  });
}

// export public methods here
module.exports = {
  index: index,
  show: show,
  createEvent: createEvent
};
