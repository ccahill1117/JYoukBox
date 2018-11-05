// BUSINESS LOGIC

function Song(title, duration) {
  this.title = title,
  this.duration = duration,
  this.id = 0
}

function Jukebox() {
  this.queue = [],
  this.queue.totalSongs = 0,
  this.currentSong = [],
  this.counter = 1
}

Jukebox.prototype.addSong = function(song) {
  this.queue.push(song);
  song.id = this.assignId();
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
      this.currentSong = [];
      this.currentSong.push(this.queue[i]);
      return this.counter += 1;
    }
  }
}

// Jukebox.prototype.startPlay = function(counter) {
//   setTimeout(function() { jukebox.playThrough(counter); },
//   jukebox.currentSong.duration);
// }

var jukebox = new Jukebox;
var newSong = new Song;

var song1 = new Song('hello',30000,1);
var song2 = new Song('goodbye',30000,2);
var song3 = new Song('hey',30000,3);
jukebox.addSong(song1);
jukebox.addSong(song2);
jukebox.addSong(song3);


// USER INTERFACE LOGIC
$(document).ready(function() {

  $("#song1").text(jukebox.queue[0].title);
  $("#song2").text(jukebox.queue[1].title);
  $("#song3").text(jukebox.queue[2].title);


  $("form#addSong").submit(function(event) {
    event.preventDefault();
    var newSongTitle = $("input#title").val();
    var newSongDuration = $("input#duration").val();

  })

  $("form#findSong").submit(function(event) {
    event.preventDefault();
  })

$("#playNext").click(function() {
  jukebox.playThrough();
  console.log(jukebox.currentSong[0].title);
  $("div#nowPlaying").text(jukebox.currentSong[0].title);
  // $("div#displayQueue").html(currentQueue);
  // $("div#history").text(queueHistory);
})

})
