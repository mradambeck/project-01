var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project01");

// import models:

module.exports.Suggestion = require("./suggestion.js");
module.exports.Activity = require("./activity.js");
module.exports.Event = require("./event.js");
