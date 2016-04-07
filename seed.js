// This file allows us to seed our application with data

var db = require("./models");

var nights = ({
  name: "Adam's Bday Bash!",
  events: [Event.schema],
  date: "November 18th"
});

db.Night.remove({}, function(err, nights){
  console.log("Everything removed!");

  db.Night.create(nightsList, function(err, nights){
    if (err) { return console.log('Seed ERROR: ', err); }

    console.log("all nights:", nights);
    console.log("created", nights.length, "nights");
    process.exit();
  });
});
