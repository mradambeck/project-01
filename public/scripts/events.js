////////////////////////////
// CLIENT SIDE JAVASCRIPT //
////////////////////////////

// takes URL, grabs eventID from the end:
var pathname = window.location.pathname,
pathSplit = pathname.split('/'),
eventID = pathSplit.pop(),
urlCall = ('/api/events/' + eventID); // creates API call URL
console.log('eventID: ', eventID);

var eventData,
$eventTarget;


///////////////
// DOC READY //
///////////////

$(document).ready(function() {
  console.log('page loaded, events.js ready!'); // sanity check
  $eventTarget = $('#event-target');

  // handlebars compile
  var source = $('#event-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: urlCall,
    success: handleSuccess,
    error: handleError
  });

  $('#suggest-btn').on('click', function(){
    $('#suggest-modal').modal();
    $('#suggest-submit-btn').on('click', function(e) {
      e.preventDefault();
      console.log('new suggestion button clicked');

      // get data from modal fields
      var formData = $('input#modal-input.form-control').serializeArray();
      console.log('events.js, formData: ', formData);

      // create path to post to
      var suggestUrl = '/api/events/' + eventID + '/suggestions';
      console.log('events.js, suggestUrl: ', suggestUrl);

      // POST to SERVER
      $.ajax({
        method: 'POST',
        url: suggestUrl,
        data: formData,
        success: suggestionSuccess,
        error: suggestionError
      });

      // clear & close modal
      $('.modal-input').val('');
      $('#suggest-modal').modal('hide');
    });
  });



});

function renderEvent(){
  var eventHtml = template({event: eventData});
  $eventTarget.append(eventHtml);
}

function handleSuccess(json){
  eventData = json;
  renderEvent();
}

function handleError(err) {
  console.log('events.js: didnt render');
  $eventTarget.text('Failed to load books, is the server working?');
}

function suggestionSuccess(json){
  console.log('suggestionSuccess: ', json);
}

function suggestionError(err){
  console.log('events.js: suggestion error: ', err);
}
