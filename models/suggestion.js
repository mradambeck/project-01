var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SuggestionSchema = new Schema ({
  name: String,
  votes: 0
});

var Suggestion = mongoose.model('Suggestion', SuggestionSchema);

module.exports = Suggestion;
