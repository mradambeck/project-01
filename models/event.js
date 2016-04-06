var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema ({
  name: String,
  timeStart: Number,
  timeEnd: Number,
  options: [optionSchema]
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
