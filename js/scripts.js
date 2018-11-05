


$(document).ready(function() {
  $("form#addSong").submit(function(event) {
    event.preventDefault();
    var newSongTitle = $("input#title").val();
    var newSongDuration = $("input#duration").val();
  })

  $("form#findSong").submit(function(event) {
    event.preventDefault();
  })

  $("div#displayQueue").html(currentQueue);
  $("div#nowPlaying").text(nowPlaying);
  $("div#history").text(queueHistory);

})
