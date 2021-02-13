//getting dom elements
const screen = document.getElementById('screen');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timespan = document.getElementById('timespan');


//functions

// 1. toggleVideo - Play or Pause Video
//If video is playing, then pause
//If video is paused, then play

const toggleVideo = () => {
    if (screen.paused) {
        screen.play();
    } else {
        screen.pause();
    }
}


// 2. updateIcon - Toggle between play and pause icon
//If video is playing, then show pause icon
//If video is paused, then show play icon
const updateIcon = () => {
    if (screen.paused) {
        play.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
    } else {
        play.innerHTML = `<i class="fas fa-pause fa-2x"></i>`;
    }
}


// 3. updateProgress - Update the progress bar and timestamp
const updateProgress = () => {
    progress.value = screen.currentTime / screen.duration * 100;

    //update timespan
    //rounding the min
    let min = Math.floor(screen.currentTime / 60);

    if (min < 10) {
        min = `0${min}`
    };

    //rounding down the seconds
    let sec = Math.floor(screen.currentTime % 60);

    if (sec < 10) {
        sec = `0${sec}`
    };

    timespan.innerHTML = `${min}:${sec}`;
}

//function stopVideo - Stop video playback and reset time to 0
const stopVideo = () => {
    screen.pause();
    screen.currentTime = 0;
}


//setProgress - update video playback time based on change in progress bar
const setProgress = () => {
    screen.currentTime = progress.value * screen.duration / 100;
}




//Event Listeners
//1- Screen Element - click to play or pause video
screen.addEventListener('click', toggleVideo);

//2-Screen Element - pause button show display while video is playing
screen.addEventListener('pause', updateIcon);

//3- Video Element - pause icon back to play icon
screen.addEventListener('play', updateIcon);

// 4. Video Element - update progress bar and timestamp
screen.addEventListener('timeupdate', updateProgress);

//5. Play-Button - Click to play or pause video
play.addEventListener('click', toggleVideo);

// 6. Stop Button - click to reset video and pause video
stop.addEventListener('click', stopVideo);

//7-Progress Bar - change position to current progress
progress.addEventListener('change', setProgress);

