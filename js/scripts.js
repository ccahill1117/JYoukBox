// BUSINESS LOGIC
function Song(title, videoID) {
  this.title = title,
  this.videoID = videoID
}

function Jukebox() {
  this.queue = [],
  this.library = [],
  this.counter = 0
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

Jukebox.prototype.removeSongFromQueueAfterPlay = function(counter) {
  for (var index=0; index< this.queue.length; index++) {
    if ([index] == (counter - 1)) {
        delete this.queue[index];
        jukebox.displayQueue();
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
    if (i === this.counter) {
      this.currentSong = [];
      this.currentSong.push(this.queue[i]);
      return this.counter +=1;
    }
  }
}

// INITIALIZE JUKEBOX & PRELOAD MEDIA
var jukebox = new Jukebox;
var song1 = new Song('Black Flag - Wasted','K89HUW3DIEk');
var song2 = new Song('Roland Kirk - Inflated Tear', 'ZIqLJmlQQNM');
var song3 = new Song('Guided By Voices - watch me jumpstart', 'KIknOdpciKQ')
var song4 = new Song('Phil Lynott and Huey Lewis - One Wish', 'SLCbFkLkFWs')
var song5 = new Song('YMO - 1000 knives', 'xB0cwq-C77g');
var song6 = new Song('Durutti Column - for Belgian Friends', 'N9EL_fHdhRc');
var song7 = new Song('Lena Platanos - Shadow of Blood',
'qIoYrkzTQoE');
var song8 = new Song('Mariah - 心臓の扉','iRgLhEGEetc');
var song9 = new Song('Wipers - Is This Real?', 'p0LseYkpFYk');
var song10 = new Song('This Does not Work', 'gibberish');
jukebox.addSongToQueue(song1);
jukebox.addSongToLibrary(song1);
jukebox.addSongToQueue(song2);
jukebox.addSongToLibrary(song2);
jukebox.addSongToQueue(song3);
jukebox.addSongToLibrary(song3);
jukebox.addSongToQueue(song4);
jukebox.addSongToLibrary(song4);
jukebox.addSongToLibrary(song5);
jukebox.addSongToLibrary(song6);
jukebox.addSongToLibrary(song7);
jukebox.addSongToLibrary(song8);
jukebox.addSongToLibrary(song9);
jukebox.addSongToLibrary(song10);

jukebox.currentSong = {title: "Wipers - Is This Real?", videoID: "p0LseYkpFYk"};

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
  if (event.data == -1) {
    checkIfUnavail();
  }
  if (event.data == YT.PlayerState.ENDED) {
    console.log("ended");
    jukebox.playThrough();
    player.loadVideoById(jukebox.currentSong[0].videoID);
    jukebox.removeSongFromQueueAfterPlay(jukebox.counter - 1);
  }
  if (event.data == YT.PlayerState.PLAYING) {
  $("#outputCurrent").text(jukebox.currentSong.title);
  $("#outputCurrent").text(jukebox.currentSong[0].title);
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
      jukebox.removeSongFromQueueAfterPlay(jukebox.counter - 1);
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

  $("#displayQueue").on('click', '.remove', function() {
    var videoId = this.id;
    jukebox.removeSongFromQueue(videoId);
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
    player.playVideo();
    getTimeAndStart();
    $("span#playNext").show();
  });

  $("span#playNext").click(function() {
    jukebox.playThrough();
    player.loadVideoById(jukebox.currentSong[0].videoID);
    jukebox.removeSongFromQueueAfterPlay(jukebox.counter - 1);
  });

})
