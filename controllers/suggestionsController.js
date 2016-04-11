var db = require('../models');

//get all suggestions within one event
// GET '/api/events/:id/suggestions/'
function showSuggestions (req, res) {
  db.Event.findOne({_id: req.params.id}, function (err, foundEvent){
    if (err) {console.log('eventsController, show err: ', err);
    return res.status(404).send({error: err});
  }
  res.json(foundEvent.activity.suggestions);
});
}

//Get one Suggestion:
// GET '/api/events/:id/suggestions/:suggid'
function showOneSuggestion (req, res) {
  db.Event.findOne({_id: req.params.id}, function (err, foundEvent){
    console.log('findOne db.Event ');
    if (err) {console.log('suggestionsController, showOne err: ', err);
      return res.status(404).send({error: err});
    }
    var suggestPath = foundEvent.activity.suggestions;
    var actualItem = suggestPath.id(req.params.suggid);
    console.log('actualItem: ', actualItem);

    res.json(actualItem);
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
        return res.status(404).send({error: err});
      }
      res.json(newSuggestion);
    });
  });
}

// Increment votes
// PUT '/api/events/:id/suggestions/:suggid'
function update (req, res) {
  db.Event.findOne({_id: req.params.id}, function (err, foundEvent){
    console.log('update findOne db.Event');
    if (err) {console.log('suggestionsController, showOne err: ', err);
      return res.status(404).send({error: err});
    }
    var suggestPath = foundEvent.activity.suggestions;
    var actualItem = suggestPath.id(req.params.suggid);
    actualItem.votes++;
    foundEvent.save(function(err, savedEvent){
      if(err) { console.log('adding to votes failed');
        return res.status(404).send({error: err});
      }
      var path = savedEvent.activity.suggestions;
      var voteCount = path.id(req.params.suggid).votes;
      res.json(voteCount);
    });
  });
}

function erase(req, res) {
  db.Event.findOne({ _id: req.params.id }, function(err, foundEvent){
    console.log('erase findOne db.Event');
    if (err) {console.log('suggestionsController, showOne err: ', err);
      return res.status(404).send({error: err});
    }
    var suggestPath = foundEvent.activity.suggestions;
    var actualItem = suggestPath.id(req.params.suggid);
    actualItem.remove();
    foundEvent.save(function(err, savedEvent){
      if(err) { console.log('erase failed');
        return res.status(404).send({error: err});
      }
      var path = savedEvent.activity.suggestions.id(req.params.suggid);
      console.log(('suggestion deleted? '), (path === null));
      res.json(path);
    });
  });
}

// export public methods here
module.exports = {
  showSuggestions: showSuggestions,
  showOneSuggestion: showOneSuggestion,
  createSuggestion: createSuggestion,
  update: update,
  erase: erase
};
