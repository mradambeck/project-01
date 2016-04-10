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
suggestionData,
$eventTarget,
$suggestionTarget;


///////////////
// DOC READY //
///////////////

$(document).ready(function() {
  console.log('page loaded, events.js ready!'); // sanity check
  $eventTarget = $('#event-target');
  $suggestionTarget = $('#suggestions-target');

  // handlebars compile
  var eventSource = $('#event-template').html();
  eventTemplate = Handlebars.compile(eventSource);

  var suggestionsSource = $('#suggestions-template').html();
  suggestionsTemplate = Handlebars.compile(suggestionsSource);

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
  var eventHtml = eventTemplate({event: eventData});
  $eventTarget.append(eventHtml);
}

function renderSuggestion(){
  var suggestionHtml = suggestionsTemplate({suggestion: suggestionData});
  $suggestionTarget.append(suggestionHtml);
}

function handleSuccess(json){
  eventData = json;
  renderEvent();
}
function handleError(err) {
  console.log('events.js: didnt render');
  $eventTarget.text('Failed to render Event');
}

function suggestionSuccess(json){
  suggestionData = json;
  renderSuggestion();
}
function suggestionError(err){
  console.log('events.js: suggestion error: ', err);
  $suggestionTarget.text('Failed to render Suggestions');
}
