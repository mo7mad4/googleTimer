// access elements at HTML 
const Timer = document.querySelector(".timer");
const Stopwatch = document.querySelector(".stopwatch");
const main = document.querySelector(".main");
const timerSection = document.querySelector(".timerSec");
const timeInput = document.querySelector(".timeInput");
const timeDiv = document.querySelector(".timeDiv");
const timeStartBout = document.querySelector("#timeStart");
const timeResetBout = document.querySelector("#timeReset");
const StopwatchSection = document.querySelector(".stopSec");
const watchInput = document.querySelector(".stopInput");
const timerFooter = document.querySelector(".timerFooter");
const StopFooter = document.querySelector(".stopFooter");
const watchStartBout = document.querySelector("#watchStart");
const resetWatchBout = document.querySelector("#stopReset");

let currentTime = 0;
let interval = null;
let startTime = 0;
let remainTime = 0;

// add event listener to switch (timer and stopwatch)
Stopwatch.addEventListener("click", () => {
  Timer.classList.remove("active");
  Stopwatch.classList.add("active");
  StopwatchSection.style.display = "block";
  timerSection.style.display = "none";
  StopFooter.style.display = "block";
  timerFooter.style.display = "none";
});

Timer.addEventListener("click", () => {
  Stopwatch.classList.remove("active");
  Timer.classList.add("active");
  StopwatchSection.style.display = "none";
  timerSection.style.display = "block";
  StopFooter.style.display = "none";
  timerFooter.style.display = "block";
});

// -------------------------TIMER----------------------------
// add event listeners for Timer buttons

timeStartBout.addEventListener("click", startTimerButt);
timeResetBout.onclick =()=>{
  clearInterval(interval);
  interval = null;
  timeDiv.children[0].textContent =" 05m ";
  timeDiv.children[1].textContent =" 00s ";
};

function startTimerButt() {
  let mins = parseInt(timeDiv.children[0].textContent.slice(1, 3));
  let sec = parseInt(timeDiv.children[1].textContent.slice(1, 3));
  if (timeStartBout.textContent === "STOP") {
    stop();
    timeStartBout.textContent = "START";
  } else {
    if (sec == 0) {
      --mins;
      timeDiv.children[0].textContent = `${mins < 10 ? "0" + mins : mins}m`;
      timeDiv.children[1].textContent = ` 59s `;
      sec = 59;
    }
    interval = setInterval(() => {
      sec = sec - 1;
      if (sec <= 0 && mins > 0) {
        --mins;
        timeDiv.children[0].textContent = `${mins < 10 ? "0" + mins : mins}m `;
        sec = 59;
      } else if (sec <= 0) {
        stop();
      }
      timeDiv.children[1].textContent = `${sec < 10 ? "0" + sec : sec}s `;
    }, 1000);
    timeStartBout.textContent = "STOP";
  }
}

// ----------------------STOPWATCH----------------------------
// add event listeners for stopwatch buttons
watchStartBout.addEventListener("click", startWatch);
resetWatchBout.addEventListener("click", reset);
// function for startWatch
const startWatch = () => {
  if (watchStartBout.textContent === "START") {
    watchStartBout.textContent = "STOP";
    interval = setInterval(timer, 1000);
  } else {
    clearInterval(interval);
    watchStartBout.textContent = "START";
  }
}

// function to increase the time (stopwatch)
const timer = () => {
  currentTime++;
  //Time Format
  let hrs = Math.floor(currentTime / 3600);
  let mins = Math.floor((currentTime - hrs * 3600) / 60);
  let secs = currentTime % 60;

  if (secs < 10) secs = "0" + secs;
  if (mins < 10) mins = "0" + mins;
  if (hrs < 10) hrs = "0" + hrs;

  watchInput.value = `${hrs}h ${mins}m ${secs}s`;
}

// function to reset the time (stopwatch)
const reset = () => {
  stop();
  currentTime = 0;
  watchInput.value = "00 00 00";
}

const stop = () => {
  clearInterval(interval);
  interval = null;
}