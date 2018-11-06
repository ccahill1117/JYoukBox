// BUSINESS LOGIC
function Song(title, duration) {
  this.title = title,
  this.duration = duration,
  this.id = 0
}

function Jukebox() {
  this.queue = [],
  this.queue.totalSongs = 0,
  this.currentSong = "",
  this.counter = 1
}

Jukebox.prototype.displayQueue = function() {
  var htmlForQueueDisplay = "";
  var sondId;
  var song;
  for (var i=0; i<this.queue.length; i++) {
    songIdNumber = this.queue[i].id;
    song = this.queue[i].title;
    htmlForQueueDisplay += "<p id=" + songIdNumber + ">" + song + "</p>"
  }
  return htmlForQueueDisplay;
}

Jukebox.prototype.addSong = function(song) {
  song.id = this.assignId();
  this.queue.push(song);
  var songHtml = "<p id=" + song.id + ">" + song.title + "</p>";
  $("#displayQueue").append(songHtml);
}

Jukebox.prototype.assignId = function() {
  return this.queue.totalSongs += 1;
}

Jukebox.prototype.grabId = function(inputID) {
  for (var index=0; index< this.queue.length; index++) {
    if (this.queue[index].id == inputID) {
      return this.queue[index].title;
    }
  };
  return false;
}

Jukebox.prototype.playThrough = function() {
  for (var i=0; i<this.queue.length; i++) {
    if (this.queue[i].id === this.counter) {
      this.currentSong = this.queue[i];
    }
  }
  return this.counter += 1;
}


// USER INTERFACE LOGIC
$(document).ready(function() {
  var jukebox = new Jukebox;

  var song1 = new Song('hello',5000,1);
  var song2 = new Song('goodbye',6000,2);
  var song3 = new Song('hey',7000,3);
  jukebox.addSong(song1);
  jukebox.addSong(song2);
  jukebox.addSong(song3);

  var htmlForQueueDisplay = jukebox.displayQueue();
  $("div#displayQueue").html(htmlForQueueDisplay);

  $("form#addSong").submit(function(event) {
    event.preventDefault();
    var songTitle = $("input#songTitle").val();
    var songDuration = parseInt($("input#duration").val());
    var song = new Song(songTitle, songDuration);
    jukebox.addSong(song);
    $("input#songTitle").val("");
    $("input#duration").val("");
  })

  $("form#findSong").submit(function(event) {
    event.preventDefault();
  })

  $("#playNext").click(function() {
    jukebox.playThrough();
    $("div#nowPlaying").text(jukebox.currentSong.title);
  })

})
