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
    var libraryClass = "clickable library"
    htmlForLibraryDisplay += `<p class="${libraryClass}" id="${song.videoID}">${song.title}</p>`;
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
  var clickableClass = "clickable";
  this.queue.forEach(function(song) {
    htmlForQueueDisplay += `<p class="${clickableClass}" id="${song.videoID}">${song.title}<span> | remove</span></p>`;
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
var jukebox = new Jukebox;
var song1 = new Song('Beatles let it be','QDYfEBY9NM4', 1);
var song2 = new Song('Black Flag - wasted','K89HUW3DIEk', 2);
var song3 = new Song('dont let me d','NCtzkaL2t_Y', 3);
var song4 = new Song('Roland Kirk - inflated tear', 'ZIqLJmlQQNM', 4);
jukebox.addSongToQueue(song1);
jukebox.addSongToLibrary(song1);
jukebox.addSongToQueue(song2);
jukebox.addSongToLibrary(song2);
jukebox.addSongToQueue(song3);
jukebox.addSongToLibrary(song3);
jukebox.addSongToQueue(song4);
jukebox.addSongToLibrary(song4);
jukebox.currentSong = {title: "beatles let it b", videoID: "QDYfEBY9NM4", id: 1};


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

function onPlayerReady(event) {
}
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    $("#outputURLSpan").text(player.getVideoUrl());
  }
  if (event.data == YT.PlayerState.PLAYING) {
  $("#outputNameSpan").text(jukebox.currentSong[0].title);
  }
  if (event.data == -1) {
    checkIfUnavail();
  }
  if (event.data == YT.PlayerState.ENDED) {
    console.log("ended");
    jukebox.playThrough();
    player.loadVideoById(jukebox.currentSong[0].videoID);
  }
}
function stopVideo() {
  player.stopVideo();
}
function getTimeAndStart() {
  player.playVideo();
  player.getDuration();
  var timeVid = player.getDuration();
  return timeVid;
}
function checkIfUnavail() {
  setTimeout(function() {
    if (player.getPlayerState() === -1) {
      jukebox.playThrough();
      player.loadVideoById(jukebox.currentSong[0].videoID);
    }
    else {clearTimeout();} }, 2000);
}
var myVar;

function playerStateConsoleLog() {
  myVar = setInterval(alertFunc, 300);
}

function alertFunc() {
  console.log(player.getPlayerState());
}

// USER INTERFACE LOGIC
$(document).ready(function() {
  var htmlForQueueDisplay = jukebox.displayQueue();
  $("div#displayQueue").html(htmlForQueueDisplay);


  $('input#videoId').on('change', function(){
    var newval = '',
        $this = $(this);
    if (newval = $this.val().match(/(\?|&)v=([^&#]+)/)) {
        $this.val(newval.pop());
    } else if (newval = $this.val().match(/(\.be\/)+([^\/]+)/)) {
        $this.val(newval.pop());
    } else if (newval = $this.val().match(/(\embed\/)+([^\/]+)/)) {
      $this.val(newval.pop().replace('?rel=0',''));
    }
  });


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

  $("div#player").on('click', '.clickable', function() {
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

  $("#displayLibrary").on('click',".clickable", function() {
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
