let responseFromServer = [
    {
        src: 'https://data-1.utreon.com/v/Yz/Fm/ZG/9zhRztOLp2Y/9zhRztOLp2Y_original.mp4',
        id: 1
    },

    {
        src: 'https://data-1.utreon.com/v/N2/Nk/Nz/AHS5Q7fxSvu/AHS5Q7fxSvu_original.mp4',
        id: 2
    },

    {
        src: 'https://data-1.utreon.com/v/Yj/A1/ZT/S832EgU6QQa/S832EgU6QQa_original.mp4',
        id: 3
    }
]

class Video {
    constructor(props) {
        this.src = props.src;
        this.id = props.id;
    }

    play(videoElement) {
        videoElement.play();
    }

    pause(videoElement) {
        videoElement.pause();
    }

    mute(videoElement) {
        videoElement.muted = true;
    }

    unmute(videoElement) {
        videoElement.muted = false;
    }
}

function getVideoPLayerTemplate(props) {
    return `
        <div class="video__player" data-id="${props.id}">
          <video class="video video-${props.id}" data-id="${props.id}" src="https://data-1.utreon.com/v/Yj/A1/ZT/S832EgU6QQa/S832EgU6QQa_original.mp4"></video>
          <div class="video__wrapper">
            <div class="video__controller">
              <img class="video__playPause" data-id="${props.id}" src="src/images/play.png">
              <div class="video__duration video__duration-${props.id}" data-id="${props.id}">0:00</div>
              <div class="video__current-duration video__current-duration-${props.id}" data-id="${props.id}">0:00</div>
              <img class="video__volume" data-id="${props.id}" src="src/images/volume.png">
            </div>
            <div class="video__line-wrapper" data-id="${props.id}">
              <div class="video__line video__line-${props.id}" data-id="${props.id}">
              <div class="video__current-line video__current-line-${props.id}" data-id="${props.id}"></div>
              </div>
            </div>
          </div>
        </div>
    `
}

const videos = [];

function renderVideos(element, dataVideos) {
    const container = document.querySelector(element);

    dataVideos.forEach(item => {
        videos.push(new Video(item));
    })

    videos.forEach(item => {
        container.innerHTML += getVideoPLayerTemplate(item);
    })
}

renderVideos('.webinar', responseFromServer);

let webinar = document.querySelector('.webinar');

webinar.addEventListener('click', handleVideo);

function handleVideo(event) {
    let target = event.target;

    if (target.hasAttribute('data-id')) {
        let id = target.getAttribute('data-id');

        let video = document.querySelector(`.video-${id}`);
        let videoElement = videos.find(item => item.id === parseInt(id));

        switch (target.className) {
            case 'video__playPause':
                playOrPauseVideo(videoElement, video, target);
                break;
            case 'video__volume':
                setVolume(videoElement, video, target);
                break;
        }
    }
}

function playOrPauseVideo(videoElement, video, button) {
    if (video.paused) {
        videoElement.play(video);
        button.src = 'src/images/pause.png';
    } else {
        videoElement.pause(video);
        button.src = 'src/images/play.png';
    }
}

function setVolume(videoElement, video, button) {
    if (video.muted) {
        videoElement.unmute(video);
        button.src = 'src/images/volume.png';
    } else {
        videoElement.mute(video);
        button.src = 'src/images/volume-muted.png';
    }
}

function setDuration() {
    videos.forEach(item => {
        let video = document.querySelector(`.video-${item.id}`);
        let duration = document.querySelector(`.video__duration-${item.id}`);

        duration.innerHTML = turnIntoMinutes(video.duration);
    })
}

function setCurrentDuration() {
    videos.forEach(item => {
        let video = document.querySelector(`.video-${item.id}`);
        let currentDuration = document.querySelector(`.video__current-duration-${item.id}`);
        let currentLine = document.querySelector(`.video__current-line-${item.id}`);
        let percent = (video.currentTime / video.duration) * 100;

        currentLine.style.width = `${percent}%`;
        currentDuration.innerHTML = turnIntoMinutes(video.currentTime);
    })
}

const allVideos = document.querySelectorAll('.video');

allVideos.forEach(item => {
    item.addEventListener('canplay', setDuration);
    item.addEventListener('timeupdate', setCurrentDuration);
})

webinar.addEventListener('click', handleLine);

function handleLine(event) {
    let target = event.target;

    if (target.classList.contains('video__line') || target.classList.contains('video__current-line')) {
        videos.forEach(item => {
            let video = document.querySelector(`.video-${item.id}`);
            let id = target.getAttribute('data-id');

            if (video.getAttribute('data-id') === id) {
                let videoLine = document.querySelector(`.video__line-${id}`);
                let width = videoLine.clientWidth;
                let clickX = event.offsetX;
                let duration = video.duration;

                video.currentTime = (clickX / width) * duration;
            }
        })
    }
}


// helpers

function turnIntoMinutes(timeDuration) {
    let time = timeDuration;
    let hours = Math.floor(time / 60 / 60);
    let min = Math.floor(time / 60) - (hours * 60);
    let sec = Math.floor(time % 60);

    return `${min}:${sec.toString().padStart(2, '0')}`
}