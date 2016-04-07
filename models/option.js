var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OptionSchema = new Schema ({
  name: String,
  votes: Number
});

var Option = mongoose.model('Option', OptionSchema);

module.exports = Option;
