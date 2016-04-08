var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Activity = require('./activity');

var EventSchema = new Schema ({
  name: String,
  date: String,
  activities: [Activity.schema]
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
