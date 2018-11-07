
// BUSINESS LOGIC
function Song(title, videoID) {
  this.title = title,
  this.videoID = videoID,
  this.id = 0

}

function Jukebox() {
  this.queue = [],
  this.library = [],
  this.queue.totalSongs = 0,
  this.counter = 1
}

Jukebox.prototype.addSongToLibrary = function(song) {
  this.library.push(song);
  song.id = this.assignId();
}

Jukebox.prototype.addSongToQueue = function(song) {
  song.id = this.assignId();
  this.queue.push(song);
  var songHtml = `<p id="${song.id}">${song.title}</p>`;
  $("#displayQueue").append(songHtml);
}
// Jukebox.prototype.removeSongFromQueue = function (){
//   for (var index=0; index< this.queue.length; index++) {
//     if (this.queue[index].id == inputID) {
//       delete this.title[i];
// }
// }
// }

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

Jukebox.prototype.displayQueue = function() {
  var htmlForQueueDisplay = "";
  var sondId;
  var song;
  var songTitle;
  var remove = "remove";
  // var button = document.createElement("BUTTON");
  // button.innerHTML = "Do Something";
  for (var i=0; i<this.queue.length; i++) {
    songIdNumber = this.queue[i].id;
    songTitle = this.queue[i].title;
    htmlForQueueDisplay += `<p id="${songIdNumber}">${songTitle}<span id="${remove}">   | remove|</span></p>`;

    // htmlForQueueDisplay += "<p id=" + songIdNumber + ">" + song + $('<button>accept</button>').attr('id', '#delete'); + "</p>"
  }
  return htmlForQueueDisplay;
}

Jukebox.prototype.playThrough = function() {
  for (var i=0; i<this.queue.length; i++) {
    if (this.queue[i].id === this.counter) {
      this.currentSong = [];
      this.currentSong.push(this.queue[i]);
      return this.counter +=1;
    }
  }
}
var jukebox = new Jukebox;
var song1 = new Song('Black Flag - I dont care','0Z-0z9RHjaY');
var song2 = new Song('Black Flag - wasted','K89HUW3DIEk');
var song3 = new Song('Roland Kirk - inflated tear', 'ZIqLJmlQQNM');
jukebox.addSongToQueue(song1);
jukebox.addSongToQueue(song2);
jukebox.addSongToQueue(song3);
jukebox.currentSong = {title: "Black Flag - I dont care", videoID: "0Z-0z9RHjaY", id: 1};


// YOUTUBE API LOGIC
var vidID = jukebox.currentSong.videoID;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: vidID,
    playerVars: {'autoplay' : 0, 'controls' : 1, 'start' : 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
// event.target.playVideo();
// comment out to NOT start at load
}
// var done = false;
function onPlayerStateChange(event) {
// if (event.data == YT.PlayerState.PLAYING && !done) {
//   // $("#output").text(player.getVideoUrl());
//   done = true;
// }
  if (event.data == YT.PlayerState.ENDED) {
    console.log("ended");
    jukebox.playThrough();
    player.loadVideoById(jukebox.currentSong[0].videoID);
  }
}

function stopVideo() {
  player.stopVideo();
}
function pauseVideo(){
  player.pauseVideo();
}


function getTimeAndStart() {
  player.playVideo();
  player.getDuration();
  var timeVid = player.getDuration();
  return timeVid;
}

// USER INTERFACE LOGIC
$(document).ready(function() {
  var htmlForQueueDisplay = jukebox.displayQueue();
  $("div#displayQueue").html(htmlForQueueDisplay);

$("form#addSongToQueue").submit(function(event) {
  event.preventDefault();
  var songTitle = $("input#songTitle").val();
  var songDuration = parseInt($("input#videoId").val());
  var song = new Song(songTitle, songDuration);
jukebox.addSongToQueue(song);
  $("#submitVideoName").val("");
  $("#submitVideoID").val("");
})



$("form#findSong").submit(function(event) {
  event.preventDefault();
})
$("#remove").click(function(){
  jukebox.removeSongFromQueue();
})
$("span#pause").click(function() {
  player.pauseVideo();
})
$("#stop").click(function() {
  player.stopVideo();
})

$("span#startButton").click(function() {
  jukebox.playThrough();
  getTimeAndStart();

  $("span#playNext").show();
  console.log("should start play....");
});

$("span#playNext").click(function() {
  jukebox.playThrough();
  player.loadVideoById(jukebox.currentSong[0].videoID);
});

})
