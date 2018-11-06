// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;



      var vidId = 'r9I4bml0SjY';

      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: vidId,
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

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          // setTimeout(stopVideo, 6000);
          done = true;
        }
        if (event.data == YT.PlayerState.ENDED) {
          console.log("ended");
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

$(document).ready(function() {



});
