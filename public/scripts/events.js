////////////////////////////
// CLIENT SIDE JAVASCRIPT //
////////////////////////////

var $startModal;

$(document).ready(function() {
  console.log('events.js loaded!');

  $.ajax({
    method: "GET",
    url: "api/sanity",
    success: sanitySuccess,
    error: sanityError
  });

  $('#startModal').modal();

});

// Just to mae sure ajax and app.js is working
function sanitySuccess(json){
  console.log("app.js, ajax call working");
  console.log(json);
}

function sanityError(err){
  console.log("app.js, ajax call error");
  console.log(err);
}
