var db = require('../models');

//get all suggestions within one event
// GET '/api/events/:id/suggestions/'
function showSuggestions (req, res) {
  db.Event.findOne({_id: req.params.id}, function (err, foundEvent){
    if (err) {console.log('eventsController, show err: ', err);
      return res.status(400).send({error: err});
    }
    res.json(foundEvent.activity.suggestions);
  });
}

// POST '/api/events/:id/suggestions/'
function createSuggestion (req, res) {
  var newSuggestion = new db.Suggestion({
    name: req.body.name,
    votes: 0
  });
  var eventID = req.params.id;

  db.Event.findById(eventID, function(err, foundEvent){
    if (err) {
      console.log("suggestionsController, createSuggestion error: ", err);
    }
    foundEvent.activity.suggestions.push(newSuggestion);
    foundEvent.save(function(err, savedEvent){
      if (err){
        console.log('foundEvent wouldnt save god damnit');
        return res.status(400).send({error: err});
      }
      res.json(newSuggestion);
    });
  });
}

// export public methods here
module.exports = {
  showSuggestions: showSuggestions,
  createSuggestion: createSuggestion
};
