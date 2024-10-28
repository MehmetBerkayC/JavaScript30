/* Get DOM elements */
const videoPlayer = document.querySelector(".player");
const video = videoPlayer.querySelector(".viewer");
const progress = videoPlayer.querySelector(".progress");
const progressBar = videoPlayer.querySelector(".progress__filled");
const toggle = videoPlayer.querySelector(".toggle");
const skipButtons = videoPlayer.querySelectorAll("[data-skip]");
const fullscreenButton = videoPlayer.querySelector(".fullscreen");
const ranges = videoPlayer.querySelectorAll(".player__slider");

/* Functionality */
function TogglePlay() {
    /* Different way */
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
    // ^
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function UpdateButton() {
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;

    // console.log("Update the button");
}

function Skip() {
    // console.log("Skipping!", this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function HandleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.name, this.value);
}

function HandleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function Scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function ToggleFullscreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
    // console.log("Toggle fullscreen");
}

/* Hook up event listeners */
video.addEventListener("click", TogglePlay);
video.addEventListener("play", UpdateButton);
video.addEventListener("pause", UpdateButton);
video.addEventListener("timeupdate", HandleProgress);

toggle.addEventListener("click", TogglePlay);
skipButtons.forEach((button) => button.addEventListener("click", Skip));
ranges.forEach((range) => {
    range.addEventListener("change", HandleRangeUpdate);
});
ranges.forEach((range) => {
    range.addEventListener("mousemove", HandleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", Scrub);
progress.addEventListener("mousemove", (e) => mousedown && Scrub(e)); // depending on mousedown being true, scrub will execute
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullscreenButton.addEventListener("click", ToggleFullscreen);
