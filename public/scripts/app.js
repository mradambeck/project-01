////////////////////////////
// CLIENT SIDE JAVASCRIPT //
////////////////////////////

$(document).ready(function() {
  console.log('app.js loaded!');
  

  $('#event-form').on('submit', function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
      method: 'POST',
      url: '/api/events',
      data: formData,
      success: newEventSuccess,
      error: newEventError
    });

    // $(this).trigger("reset");
  });

});

// form submission handlers
function newEventSuccess(json){
  console.log("app.js, ajax call success");
  console.log(json);
}

function newEventError(json){
  console.log("app.js, ajax call error");
  console.log(err);
}
