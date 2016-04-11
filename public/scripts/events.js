////////////////////////////
// CLIENT SIDE JAVASCRIPT //
////////////////////////////

// takes URL, grabs eventID from the end, cretes API paths:
var pathname = window.location.pathname,
pathSplit = pathname.split('/'),
eventID = pathSplit.pop(),
urlCall = ('/api/events/' + eventID); // creates API call URL
suggUrlCall = ('/api/events/' + eventID + '/suggestions'); // creates API call for Suggestions URL
console.log('URL call for suggestions: ', suggUrlCall);

// Global Variables
var elementId,
eventData,
suggestionData,
suggOnLoadData,
$deleteButtonId,
$eventTarget,
$suggestionId,
$suggestionTarget,
$voteButton;

var elementIdStart = '#';

///////////////
// DOC READY //
///////////////

$(document).ready(function() {
  console.log('page loaded, events.js ready!'); // sanity check
  $eventTarget = $('#event-target');
  $suggestionTarget = $('#suggestions-target');

  // handlebars compiling
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
    var formData = $('input#modal-input.form-control').serializeArray(); // get data from modal fields
    var suggestUrl = '/api/events/' + eventID + '/suggestions'; // create path to post to

    // POST suggestion to server
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
  var txt = $('.activity-text').text().toUpperCase();
  $('.activity-text').text(txt);
}

// handlebars rendering of a new suggestion card
function renderSuggestion(){
  var suggestionHtml = suggestionsTemplate({suggestion: suggestionData});
  $suggestionTarget.append(suggestionHtml);
  vote();
  erase();
}

// handlebars rendering of all suggestions on load
function renderSuggestions(){
  var suggestionsHtml = suggOnLoadTemplate({suggestions: suggOnLoadData});
  $suggestionTarget.append(suggestionsHtml);
  vote();
  erase();
}


// Voting
function vote(){
  $('.vote-btn').on('click', function(event){
    event.preventDefault();
    $suggestionId = $(this).data('suggestion-id');
    var voteUrl = (suggUrlCall + '/' + $suggestionId);

    $.ajax({
      method: 'PUT',
      url: voteUrl,
      success: voteSuccess,
      error: voteError
    });
  });
}

// Delete a suggestion
function erase(){
  $('.delete-btn').on('click', function(event){
    $deleteButtonId = $(this).data('suggestion-id');
    var deleteUrl = (suggUrlCall + '/' + $deleteButtonId);

    $.ajax({
      method: 'DELETE',
      url: deleteUrl,
      success: deleteSuccess,
      error: deleteError
    });
  });
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

// Updating votes in DOM
function voteSuccess(voteCount){
  elementId = elementIdStart + $suggestionId;
  $(elementId).text(voteCount);
}
function voteError(){
  console.log('voteError!');
  $suggestionTarget.text('Failed to render vote!');
}

// Deleting Suggestions
function deleteSuccess(){
  console.log("deleteSuccess!");
  var cardId = '#' + $deleteButtonId + '-card';
  var spacerId = '#' + $deleteButtonId + '-spacer';
  $(cardId).hide("slow");
  $(spacerId).hide("slow");
}
function deleteError(err){
  console.log("deleteError! ", err);
}

function toUpperCase(str) {
    return str.toUpperCase();
}
