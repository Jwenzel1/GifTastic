var topics = ["dogs", "cats", "bears", "john cena", "doge", "futurama", "birds", "computers", "hacking", "marvel", "travel"];

function addButton(name){
  var $buttonToAdd = $("<button>");
  $buttonToAdd.addClass("btn waves-effect waves-light");
  $buttonToAdd.attr("data-topic", name)
  $buttonToAdd.text(name);
  $("#topicsArea").append($buttonToAdd);
}

function addGifs(name){
  $("#gifsArea").empty();
  var key = "97be7d60a4e14ba2adcdba33e5875010";
  var query = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + name +  "&limit=10&offset=0&rating=PG-13&lang=en";
  $.get(query).done(function(response){
    for(var i = 0; i < response.data.length; i++){
      var gifToAppend = $("<div>").addClass("gif");
      var stillUrl = response.data[i].images.fixed_height_still.url;
      var gifUrl = response.data[i].images.fixed_height.url;
      gifToAppend.append($("<img>").attr({src: stillUrl, "data-toggleImg": gifUrl}));
      gifToAppend.append($("<p>").text("Rating: " + response.data[i].rating));
      $("#gifsArea").append(gifToAppend);
    }
  });
}

function toggleGif(currentGif){
  var originalState = currentGif.attr("src");
  currentGif.attr("src", currentGif.attr("data-toggleImg"));
  currentGif.attr("data-toggleImg", originalState);
}

function checkInput(input){
  if(input === ""){
    return false;
  }
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  for(var i = 0; i < input.length; i++){
    if(alphabet.indexOf(input.charAt(i)) === -1){
      return false;
    }
  }
  return true;
}

$(document).ready(function(){
  for(var i = 0; i < topics.length; i++){
    addButton(topics[i]);
  }

  $(document).on("click", "#topicsArea button", function(){
    addGifs($(this).attr("data-topic"));
  });

  $(document).on("click", "#gifsArea .gif img", function(){
    toggleGif($(this));
  });

  $("form").submit(function(){
    var text = $("form input").val().toLowerCase();
    if(topics.indexOf(text) === -1 && checkInput(text)){
      addButton(text);
    }
    $("form input").val("");
    return false;
  });
});
