////////////////////////////
// CLIENT SIDE JAVASCRIPT //
////////////////////////////

// takes URL, grabs eventID from the end:
var pathname = window.location.pathname,
  pathSplit = pathname.split('/'),
  eventID = pathSplit.pop(),
  urlCall = ('/api/events/' + eventID); // creates API call URL

  console.log('eventID: ', eventID);
  console.log('urlCall: ', urlCall);

var eventData,
 $eventTarget;





$(document).ready(function() {
  console.log('page loaded, events.js ready!');

  $eventTarget = $('#event-target');

  var source = $('#event-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: urlCall,
    success: handleSuccess,
    error: handleError
  });


  // $('#startModal').modal();

});

function renderEvent(){
  // $eventTarget.empty();
  var eventHtml = template({event: eventData});
  console.log('eventHtml: ', eventHtml);
  $eventTarget.append(eventHtml);
}

function handleSuccess(json){
  eventData = json;
  console.log('eventData:', eventData);
  renderEvent();
  // console.log(eventData);
}

function handleError(err) {
  console.log('events.js: didnt render');
  // $('#bookTarget').text('Failed to load books, is the server working?');
}
