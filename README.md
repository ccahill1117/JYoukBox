# jYoukBox

#### A song/video player

![](img/Screen Shot 2018-11-07 at 4.22.49 PM.png)

#### Scott Bergler, Chris Cahill & Ryan Leslie

## Description
The goal of this project is to create a Spotify-like song/video player. A user can create/generate a list of media to play. It will play through that list and the user can continue to add to the list as it plays. Ultimately, we would like multiple users to be able to add to the list from their own devices (tablets, phones, etc.).

### Current functionalities:
##### Library and Song Queue:
The library is a storehouse of songs the user can choose to add to the song queue.

The song queue is a list of songs that are queued up to be played in sequence.

The application preloads a few songs into the library and song queue (see image above). The user can hit the play icon to start the videos. It will play through those videos and stop.

The user can add songs to the song queue in two ways:

![](img/Screen Shot 2018-11-07 at 4.23.55 PM.png)

The first way involves the user going to YouTube to get a video ID from the video's url and entering that along with any title they would like in the form shown above. These songs are put into the library and in to the song queue;

![](img/Screen Shot 2018-11-07 at 4.24.27 PM.png)

The second way a user can add to the song queue is by looking at the songs loaded into the library. Clicking on any song in that list will add it to the song queue.

### Planned functionalities:
##### ??????:

What is Chris working on? Prevent videos that can't load from

### Things we'll need:
BUSINESS LOGIC
Jukebox object
  -queue array
  -history queue
  -now playing
  * add media method

Song/Video object
  -title
  -duration
  -queueId
  * create song method

USER INTERFACE
Show queue on screen
Show now playing on screen
Show history on screen
Search for songs
Add songs


### Specifications:
##### Spec 1: Create a song object:
- [x] **Expect:** input/output expected;

##### Spec 2: Create a new song:
- [x] **Expect:** input/output expected;

##### Spec 3: Add song to play queue:
- [x] **Expect:** input: a song/output: song added to queue;

##### Spec 4: console.log queue:
- [x] **Expect:** input: console.log(queue)/output: list of songs added to queue;

##### Spec 5: find song in libray:
- [x] **Expect:** input: video Id / return: video index;

##### Spec 6: remove song from libray:
- [ ] **Expect:** ;

##### Spec 6: display libray:
- [x] **Expect:** user clicks on library-linked element, the library shows as a list;

##### Spec 7: A click on song in library list adds that song to the queue:
- [x] **Expect:** user clicks on library-linked element, the library shows as a list;

##### Spec 8: Remove a song from the queue:
- [ ] **Expect:** user clicks on song to remove it from the list;

##### Spec 9: Highlight Now Playing song:
- [ ] **Expect:** ;

##### Spec 10: Pre-load library:
- [ ] **Expect:** ;


## Setup/Installation Requirements
To view or clone the code, go to [GitHub](https://github.com/skillitzimberg/JYoukBox).

The page is live at: [GitHub]( ).

## Known Bugs

## Support and contact details

Where to complain/suggest

## Technologies Used

HTML, CSS, & Javascript. More?

### License

Licensed under the MIT license.

Copyright (c) 2018 ** Authors **
