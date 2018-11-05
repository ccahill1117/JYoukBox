function Song(title, duration) {
  this.title = title,
  this.duration = duration,
  this.id = 0
}

function Jukebox() {
  this.queue = [],
  this.queue.totalSongs = 0,
  this.currentSong = 0
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


var jukebox = new Jukebox;
var newSong = new Song;

$(document).ready(function() {
  $("#inputSongs").submit(function(event){
    event.preventDefault();

    $("#queueOutput").text()
  });

});
