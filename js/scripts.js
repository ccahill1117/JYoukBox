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

Jukebox.prototype.playThrough = function(counter) {
  for (var i=0; i<this.queue.length; i++) {
    if (this.queue[i].id === counter) {
      this.currentSong.push(this.queue[i]);
      this.counter += 1;
    }
  }
}




var jukebox = new Jukebox;
var newSong = new Song;

var song1 = new Song('hello',3000,1);
var song2 = new Song('goodbye',3000,2);
var song3 = new Song('hey',3000,3);

$(document).ready(function() {
  $("#inputSongs").submit(function(event){
    event.preventDefault();

    $("#queueOutput").text()
  });

});
