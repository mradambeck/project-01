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
hasVoted,
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
  hasVoted = false;

  // handlebars compiling
  var eventSource = $('#event-template').html();
  eventTemplate = Handlebars.compile(eventSource);
  var suggestionsSource = $('#suggestions-template').html();
  suggestionsTemplate = Handlebars.compile(suggestionsSource);
  var suggOnLoadSource = $('#sugg-onLoad-template').html();
  suggOnLoadTemplate = Handlebars.compile(suggOnLoadSource);
  var closedModalSource = $('#voting-closed-template').html();
  closedModalTemplate = Handlebars.compile(closedModalSource);


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

  // turn off voting, display results page
  $('#end-voting-btn').on('click', function(){

    $.ajax({
      method: 'PUT',
      url: urlCall,
      success: endVotingSuccess,
      error: endVotingError
    });

  });

});


///////////////
// FUNCTIONS //
///////////////

// HANDLEBARS rendering of event data
function renderEvent(){
  var eventHtml = eventTemplate({event: eventData});
  $eventTarget.append(eventHtml);
  var txt = $('.activity-text').text().toUpperCase();
  $('.activity-text').text(txt);
  console.log(eventData.votingAllowed);
}
// HANDLEBARS rendering of a new suggestion card
function renderSuggestion(){
  var suggestionHtml = suggestionsTemplate({suggestion: suggestionData});
  $suggestionTarget.append(suggestionHtml);
  vote();
  erase();
}
// HANDLEBARS rendering of all suggestions on load
function renderSuggestions(){
  var suggestionsHtml = suggOnLoadTemplate({suggestions: suggOnLoadData});
  $suggestionTarget.append(suggestionsHtml);
  vote();
  erase();
}
// HANDLEBARS rendering of Closed Modal
function renderClosedModal(){
  var closedHtml = closedModalTemplate({event: eventData});
  $('#closed-modal-target').append(closedHtml);
}

// Voting
function vote(){

  $('.vote-btn').on('click', function(event){
    event.preventDefault();
    $suggestionId = $(this).data('suggestion-id');
    var voteUrl = (suggUrlCall + '/' + $suggestionId);

    if (hasVoted === false){
      $.ajax({
        method: 'PUT',
        url: voteUrl,
        success: voteSuccess,
        error: voteError
      });
    }


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

// Populating event data on load
function handleSuccess(json){
  eventData = json;
  renderEvent();
  console.log(eventData);
  if (eventData.votingAllowed === false){
    endVotingSuccess(eventData);
  }
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

// Populating existing suggestions on load
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
  hasVoted = true;
}
function voteError(){
  console.log('voteError!');
  $suggestionTarget.text('Failed to render vote!');
}

// Deleting Suggestions
function deleteSuccess(){
  var cardId = '#' + $deleteButtonId + '-card';
  var spacerId = '#' + $deleteButtonId + '-spacer';
  $(cardId).hide("slow");
  $(spacerId).hide("slow");
}
function deleteError(err){
  console.log("deleteError! ", err);
}

// End Voting
function endVotingSuccess(json){
  eventData = json;
  votingClosed();
}
function endVotingError(){
  console.log('endVotingError!');
}
function votingClosed(){
  console.log('voting closed!');
  $('#voting-closed-modal').modal();
  renderClosedModal();
}

// Make a string Uppercase
function toUpperCase(str) {
  return str.toUpperCase();
}
