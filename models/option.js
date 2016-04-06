var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OptionSchema = new Schema ({
  name: String
});

var Option = mongoose.model('Option', OptionSchema);

module.exports = Option;
