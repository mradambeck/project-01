var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SuggestionSchema = new Schema ({
  name: String,
  votes: Number
});

var Suggestion = mongoose.model('Suggestion', SuggestionSchema);

module.exports = Suggestion;
