// Timer 
let minutes = 0;
let seconds = 0;
let chronology;
let stopWatch = document.timer.start;

stopWatch.addEventListener('click', startGame);

function startGame() {
  //                                           clearInterval(chronology); <-- Need at game completion?
  // Set timer in motion
  chronology = setInterval(() => {timer();}, 1000);
  stopWatch.removeEventListener('click', startGame);

  // Activate flip tile button click event listeners
  activateTiles();
  
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

// Register click event listener on flip tile buttons
let flipBtns = Array.from(document.getElementsByClassName('flip-btn'));
const activateTiles = () => {
  flipBtns.forEach(flipBtn => {
    flipBtn.addEventListener('click', flipTile);
  });
};

// Flip tile to reveal image underneath
function flipTile(e) {
  current = e.currentTarget;
  current.style.background = 'crimson';
}
