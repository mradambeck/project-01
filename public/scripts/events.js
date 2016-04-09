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
  });

  $('#suggest-submit-btn').on('click', function(){
    
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
