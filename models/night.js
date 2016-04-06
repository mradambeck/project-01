var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Event = require('./event');

var NightSchema = new Schema ({
  name: String,
  events: [Event.schema],
  date: String
});

var Night = mongoose.model('Night', NightSchema);

module.exports = Night;
