var topics = ["dogs", "cats", "bears", "john cena", "doge", "futurama", "cats"];
var key = "97be7d60a4e14ba2adcdba33e5875010";
var actualGifs = [];
var stills = []

function addButton(name){
  var $buttonToAdd = $("<button>");
  $buttonToAdd.addClass("btn waves-effect waves-light");
  $buttonToAdd.attr("data-topic", name)
  $buttonToAdd.text(name);
  $("#topicsArea").append($buttonToAdd);
}

function addGifs(name){
  $("#gifsArea").empty();
  actualGifs = [];
  stills = []
  var query = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + name +  "&limit=10&offset=0&rating=PG-13&lang=en";
  $.get(query).done(function(response){
    for(var i = 0; i < response.data.length; i++){
      var gifToAppend = $("<div>").addClass("gif");
      var url = response.data[i].images.fixed_height_still.url
      stills.push(url);
      actualGifs.push(response.data[i].images.fixed_height.url)
      gifToAppend.append($("<img>").attr({src: url,"data-state": 0, "data-number": i}));
      gifToAppend.append($("<p>").text("Rating: " + response.data[i].rating));
      $("#gifsArea").append(gifToAppend);
    }
  });
}

function toggleGif(currentGif){
  if(currentGif.attr("data-state") === "0"){
    currentGif.attr("data-state", 1);
    currentGif.attr("src", actualGifs[currentGif.attr("data-number")]);
  }
  else{
    currentGif.attr("data-state", 0);
    currentGif.attr("src", stills[currentGif.attr("data-number")]);
  }
}

$(document).ready(function(){
  for(var i = 0; i < topics.length; i++){
    addButton(topics[i]);
  }

  $("form").submit(function(){
    var text = $("form input").val().toLowerCase();
    if(topics.indexOf(text) === -1){
      addButton(text);
    }
    $("form input").val("");
    return false;
  });

  $(document).on("click", "#topicsArea button", function(){
    addGifs($(this).attr("data-topic"));
  });

  $(document).on("click", "#gifsArea .gif img", function(){
    toggleGif($(this));
  });
});
