var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Suggestion = require('./suggestion');

var ActivitySchema = new Schema ({
  name: String,
  suggestions: [Suggestion.schema]
});

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
