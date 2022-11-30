// Timer 
let minutes = 0;
let seconds = 0;
let chronology;
let stopWatch = document.timer.start;

stopWatch.addEventListener('click', startTimer);

function startTimer() {
  // clearInterval(chronology);
  chronology = setInterval(() => {timer();}, 1000);
  stopWatch.removeEventListener('click', startTimer);
}

function timer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  document.getElementById('minute').innerText = minutes;
  document.getElementById('second').innerText = renderSeconds(seconds);
}

function renderSeconds(time) {
  return time >= 10 ? time : `0${time}`;
}
