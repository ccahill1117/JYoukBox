// BUSINESS LOGIC
function Song(title, videoID) {
  this.title = title,
  this.videoID = videoID
}

function Jukebox() {
  this.queue = [],
  this.library = [],
  this.counter = 1
}

Jukebox.prototype.addSongToLibrary = function(song) {
  this.library.push(song);
}

Jukebox.prototype.findSongInLibrary = function(videoId) {
  for (var index=0; index< this.library.length; index++) {
    if (this.library[index]) {
      if (this.library[index].videoID == videoId) {
        return index;
      }
    }
  };
  return false;
}

Jukebox.prototype.removeSongFromLibrary = function(videoId) {
  var indexOfSongToRemove = this.findSongInLibrary(videoId);
  delete this.library[indexOfSongToRemove];
}

Jukebox.prototype.displayLibrary = function() {
  var htmlForLibraryDisplay = "";
  this.library.forEach(function(song) {
    var libraryClass = "clickable library";
    var clickableRemoveClass = "remove";
    htmlForLibraryDisplay += `<p class="${libraryClass}" id="${song.videoID}">${song.title}<span class="${clickableRemoveClass}" id="${song.videoID}"> | remove</span></p>`;
  })
  return htmlForLibraryDisplay;
}

Jukebox.prototype.addSongToQueue = function(song) {
  this.queue.push(song);
  jukebox.displayQueue();
}

Jukebox.prototype.removeSongFromQueue = function(videoId) {
  for (var index=0; index< this.queue.length; index++) {
    if (this.queue[index]) {
      if (this.queue[index].videoID == videoId) {
        delete this.queue[index];
        jukebox.displayQueue();
      }
    }
  }
  return this.queue[index];
}

Jukebox.prototype.displayQueue = function() {
  var htmlForQueueDisplay = "";
  var queueClass = "queue"
  var clickableRemoveClass = "clickable remove";
  this.queue.forEach(function(song) {
    htmlForQueueDisplay += `<p" class="${queueClass}" id="${song.videoID}">${song.title}<span class="${clickableRemoveClass}" id="${song.videoID}"> | remove</span></p>`;
  })
  $("#displayQueue").html(htmlForQueueDisplay);
  return htmlForQueueDisplay;
}

Jukebox.prototype.playThrough = function() {
  for (var i=0; i<this.queue.length; i++) {
    if (i + 1 === this.counter) {
      this.currentSong = [];
      this.currentSong.push(this.queue[i]);
      return this.counter +=1;
    }
  }
}

// INITIALIZE JUKEBOX & PRELOAD MEDIA
var jukebox = new Jukebox;
var song1 = new Song('Black Flag - I dont care','0Z-0z9RHjaY');
var song2 = new Song('Black Flag - wasted','K89HUW3DIEk');
var song3 = new Song('Roland Kirk - inflated tear', 'ZIqLJmlQQNM');
jukebox.addSongToQueue(song1);
jukebox.addSongToLibrary(song1);
jukebox.addSongToQueue(song2);
jukebox.addSongToLibrary(song2);
jukebox.addSongToQueue(song3);
jukebox.addSongToLibrary(song3);
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
}

function onPlayerStateChange(event) {
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
    var songDuration = $("input#videoId").val();
    var song = new Song(songTitle, songDuration);
    jukebox.addSongToLibrary(song);
    jukebox.addSongToQueue(song);
    $("#submitVideoName").val("");
    $("#submitVideoID").val("");
  })

  $("#displayQueue").on('click', '.remove', function() {
    console.log("Song clicked!");
    var videoId = this.id;
    console.log(videoId);
    jukebox.removeSongFromQueue(videoId);
  })

  $("#displayLibrary").on('click', 'span.remove', function() {
    console.log("Song clicked!");
    var videoId = this.id;
    console.log(videoId);
    jukebox.removeSongFromLibrary(videoId);
  })

  $("span#pause").click(function() {
    player.pauseVideo();
  })

  $("#stop").click(function() {
    player.stopVideo();
  })

  $("span#findSong").click(function() {
    var htmlForLibraryDisplay = jukebox.displayLibrary();
    $("div#displayLibrary").html(htmlForLibraryDisplay);
  })

  $("#displayLibrary").on('click', '.clickable', function() {
    var videoId = this.id;
    var songIndex = jukebox.findSongInLibrary(videoId);
    var song = jukebox.library[songIndex];
    jukebox.addSongToQueue(song);
  })

  $("span#startButton").click(function() {
    jukebox.playThrough();
    getTimeAndStart();
    $("span#playNext").show();
  });

  $("span#playNext").click(function() {
    jukebox.playThrough();
    player.loadVideoById(jukebox.currentSong[0].videoID);
  });

})
