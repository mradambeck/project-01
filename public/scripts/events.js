////////////////////////////
// CLIENT SIDE JAVASCRIPT //
////////////////////////////

// takes URL, grabs eventID from the end, cretes API paths:
var pathname = window.location.pathname,
pathSplit = pathname.split('/'),
eventID = pathSplit.pop(),
urlCall = ('/api/events/' + eventID); // creates API call URL
suggUrlCall = ('/api/events/' + eventID + '/suggestions'); // creates API call for Suggestions URL
console.log('eventID: ', eventID);
console.log('suggUrlCall: ', suggUrlCall);

var eventData,
suggestionData,
suggOnLoadData,
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

  var suggOnLoadSource = $('#sugg-onLoad-template').html();
  suggOnLoadTemplate = Handlebars.compile(suggOnLoadSource);


  // Populate Events on load
  $.ajax({
    method: 'GET',
    url: urlCall,
    success: handleSuccess,
    error: handleError
  });

  // Populate Suggestions on load
  $.ajax({
    method: 'GET',
    url: suggUrlCall,
    success: suggOnLoadSuccess,
    error: suggOnLoadError
  });

  // Open Suggestion modal
  $('#suggest-btn').on('click', function(){
    $('#suggest-modal').modal();
  });

  // Suggestions submission handling
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
    $('#modal-input').val('');
    $('#suggest-modal').modal('hide');
  });

});


///////////////
// FUNCTIONS //
///////////////

// handlebars rendering of event data
function renderEvent(){
  var eventHtml = eventTemplate({event: eventData});
  $eventTarget.append(eventHtml);
}

// handlebars rendering of a new suggestion card
function renderSuggestion(){
  var suggestionHtml = suggestionsTemplate({suggestion: suggestionData});
  $suggestionTarget.append(suggestionHtml);
}

// handlebars rendering of all suggestions on load
function renderSuggestions(){
  var suggestionsHtml = suggOnLoadTemplate({suggestions: suggOnLoadData});
  $suggestionTarget.append(suggestionsHtml);
}

// Populating event on load
function handleSuccess(json){
  eventData = json;
  renderEvent();
}
function handleError(err) {
  console.log('events.js: didnt render');
  $eventTarget.text('Failed to render Event');
}

// Adding new suggestion
function suggestionSuccess(json){
  suggestionData = json;
  renderSuggestion();
}
function suggestionError(err){
  console.log('events.js: suggestion error: ', err);
  $suggestionTarget.text('Failed to render Suggestion');
}

// Populating suggestions on load
function suggOnLoadSuccess(json){
  suggOnLoadData = json;
  renderSuggestions();
}
function suggOnLoadError(err){
  console.log('events.js: suggOnLoad error: ', err);
  $suggestionTarget.text('Failed to render Suggestions');
}
