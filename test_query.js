var db = require("./models");

db.Event
  .findOne({_id: "570bdcb43ef7db7f2e3a0e80"})
  .exec(function (err, foundEvent){
    if (err) {console.log('eventsController, show err: ', err);
      console.log({error: err});
    }
    var sorted_suggestions = foundEvent.activity.suggestions.sort(function(a,b){return a.votes <= b.votes;});
    console.log(sorted_suggestions);
    process.exit();
  });
