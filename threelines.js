// Handlebars adds the _id of the item to the HTML on rendering
<button type="button" class="btn btn-success btn-block vote-btn" data-suggestion-id="{{suggestion._id}}">VOTE</button>


function vote(){
  $('.vote-btn').on('click', function(event){
    event.preventDefault();
    $suggestionId = $(this).data('suggestion-id'); // Grabs the _id
    var voteUrl = (suggUrlCall + '/' + $suggestionId); // Creates the URL for the API endpoint

    $.ajax({
      method: 'PUT',
      url: voteUrl,
      success: voteSuccess,
      error: voteError
    });
  });
}

function voteSuccess(voteCount){
  elementId = elementIdStart + $suggestionId;
  $(elementId).text(voteCount); // Updates the count in the window
}
