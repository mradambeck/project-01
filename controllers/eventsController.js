var db = require('../models');

//get all events
function index(req, res){
  //find events
  db.Event.find(function (err, events){
    if (err){
      return console.log('ERR: server.js: GET /api/events: ', err);}
    console.log('BOOM: server.js: GET api/events', events);
    res.json(events);
  });
}

// GET ONE EVENT
function show (req, res) {
  var id = req.params.id;
  console.log('GET /api/events/:id:', id);

  db.Event.findOne({_id: id}, function (err, foundEvent){
    if (err) {return console.log('index error: ', err);}
    res.json(foundEvent);
  });
}

// export public methods here
module.exports = {
  index: index,
  show: show
};
