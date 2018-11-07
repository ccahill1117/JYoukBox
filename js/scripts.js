
function Song(title, videoID, id) {
  this.title = title,
  this.videoID = videoID,
  this.id = id
}

function Jukebox() {
  this.queue = [],
  this.library = [],
  this.queue.totalSongs = 0,
  this.counter = 1
}

Jukebox.prototype.addSongToQueue = function(song) {
  this.queue.push(song);
  }

Jukebox.prototype.addSongToLibrary = function(song) {
  this.library.push(song);
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
      return this.counter +=1;

    }
  }
}

var jukebox = new Jukebox;
var newSong = new Song;

var song1 = new Song('Beatles let it be','QDYfEBY9NM4', 1);
var song2 = new Song('Black Flag - wasted','K89HUW3DIEk', 2);
var song3 = new Song('dont let me d','NCtzkaL2t_Y', 3);
var song4 = new Song('Roland Kirk - inflated tear', 'ZIqLJmlQQNM', 4);

jukebox.addSongToQueue(song1);
jukebox.addSongToQueue(song2);
jukebox.addSongToQueue(song3);
jukebox.addSongToQueue(song4);
jukebox.currentSong = {title: "beatles LIB", videoID: "QDYfEBY9NM4", id: 1};


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
        if (event.data == YT.PlayerState.PLAYING) {
          $("#outputURLSpan").text(player.getVideoUrl());
                  //   done = true;
        }
        if (event.data == YT.PlayerState.PLAYING) {
        $("#outputNameSpan").text(jukebox.currentSong[0].title);
                //   done = true;
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

      var playerStateReturned;

      function checkIfUnavail() {
        playerStateReturned = setTimeout(function() {
          if (player.getPlayerState() === -1) {
            jukebox.playThrough();
            player.loadVideoById(jukebox.currentSong[0].videoID);
          }
          else {clearTimeout();} }, 2000);

      }

$(document).ready(function() {
  $("#startButton").click(function() {
      jukebox.playThrough();
      getTimeAndStart();
      $("#nextButton").show();

      console.log("should start play....");
  });

  $("#nextButton").click(function() {
    jukebox.playThrough();
    player.loadVideoById(jukebox.currentSong[0].videoID);
  });

  $("#addSong").submit(function(event) {
    event.preventDefault();
    var inputSongName = $("#submitVideoName").val();
    var inputSongID = $("#submitVideoID").val();
    jukebox.addSongToLibrary(new Song(inputSongName,inputSongID));
    $("#submitVideoName").val("");
    $("#submitVideoID").val("");
  })

  //shoutout https://codepen.io/catmull/pen/cnpsK
  $('.youTubeURLMachine').on('change', function(){
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

});
