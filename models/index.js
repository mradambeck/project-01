var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                "mongodb://localhost/project01");

// import models:

module.exports.Suggestion = require("./suggestion.js");
module.exports.Activity = require("./activity.js");
module.exports.Event = require("./event.js");
