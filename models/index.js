var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project01");

// import models:

module.exports.Night = require("./night.js");
module.exports.Event = require("./event.js");
module.exports.Option = require("./option.js");
