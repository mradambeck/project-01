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


// export public methods here
module.exports = {
  index: index
};
