// Timer variables
let minutes = 0;
let seconds = 0;
let chronology;
let stopWatch = document.timer.start;

// Register click event listener on Start button
stopWatch.addEventListener('click', startGame);

// Activate timer and game
function startGame() {
  // Set timer in motion
  chronology = setInterval(() => {updateTimer();}, 1000);
  // Deactivate Start button
  stopWatch.removeEventListener('click', startGame);
  stopWatch.textContent = "Go";
  stopWatch.style.width = "3.9375rem";
  // Activate Flip tile button click event listeners
  activateTiles();
  //      stopWatch.textContent = "Done";      clearInterval(chronology); <-- Need at game completion?    TODO
}

// Update timer and render current time
function updateTimer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  document.getElementById('minute').innerText = minutes;
  document.getElementById('second').innerText = renderSeconds(seconds);
}

// Helper function to render seconds correctly
function renderSeconds(time) {
  return time >= 10 ? time : `0${time}`;
}

// Register click event listener on Flip tile buttons
let flipBtns = Array.from(document.getElementsByClassName('flip-btn'));
function activateTiles() {
  flipBtns.forEach(flipBtn => {
    flipBtn.addEventListener('click', flipTile);
  });
}

// Helper function to flip tile to back side and show active button
let activateTile = (current, tileNum) => {
  // Change button color
  current.style.background = 'crimson';
  // Remove hover listeners of inactive state if relevant
  current.removeEventListener('mouseenter', btnHover);
  current.removeEventListener('mouseleave', btnLeave);
  // Flip the tile over to the back side
  let currentTileInner = current.nextElementSibling.getElementsByClassName('flip-tile-inner')[0];
  currentTileInner.style.transform = 'rotateY(180deg)';
  currentTileInner.getElementsByClassName('flip-tile-back')[0].style.background = gameTileBacks[tileNum];
}

// Helper functions to return hover condition (background) of button
let btnHover = e => {e.currentTarget.style.background = 'rgb(50, 74, 246)'};
let btnLeave = e => {e.currentTarget.style.background = 'linear-gradient(135deg, rgb(100, 149, 237) 0%, rgb(0, 0, 255) 100%)'};

// Helper function to flip tile to front side and show inactive button
let inactivateTile = (current) => {
  // Change button color
  current.style.background = 'linear-gradient(135deg, rgb(100, 149, 237) 0%, rgb(0, 0, 255) 100%)';
  // Restablish hover signifier on button background
  current.addEventListener('mouseenter', btnHover);
  current.addEventListener('mouseleave', btnLeave);
  // Flip the tile back over to the front side
  let currentTileInner = current.nextElementSibling.getElementsByClassName('flip-tile-inner')[0];
  currentTileInner.style.transform = 'rotateY(0deg)';
}

// Helper function to briefly signify button's inability to flip a new tile until a previous one is flipped back
let limitButton = (current) => {
  // Change button color temporarily
  current.style.background = 'darkslategray';
  // Change button color back after a moment
  setTimeout(() => {current.style.background = 'linear-gradient(135deg, rgb(100, 149, 237) 0%, rgb(0, 0, 255) 100%)';}, 300);
  current.addEventListener('mouseenter', btnHover);
  current.addEventListener('mouseleave', btnLeave);
}

// Flip tile if able
let activeTileBacks = [];
console.log('let activeTileBacks = []: ', activeTileBacks.length, activeTileBacks);        /* TEST */
function flipTile(e) {
  let current = e.currentTarget;
  let tileNum = current.getAttribute('data-pic');
  console.log(tileNum, activeTileBacks.length, activeTileBacks);                       /* TEST */
  if (activeTileBacks.length <= 1) {
    if (activeTileBacks[0] !== tileNum) {
      activeTileBacks.push(tileNum);
      activateTile(current, tileNum);
      console.log('(activeTileBacks.length <= 1): ', activeTileBacks.length, activeTileBacks);      /* TEST */
    }
    else {
      activeTileBacks.pop();
      //Flip the tile BACK to front AND change button color BACK to blue gradient
      console.log('activeTileBacks.pop(): ', activeTileBacks.length, activeTileBacks);        /* TEST */
      inactivateTile(current);
    }
  }
  else if (activeTileBacks.length == 2 && activeTileBacks.includes(tileNum)) {
    activeTileBacks.splice(activeTileBacks.indexOf(tileNum), 1);
    //Flip the tile BACK to front AND change button color BACK to blue gradient
    console.log('length = 2 && activeTileBacks.includes(tileNum): ', activeTileBacks.length, activeTileBacks); /* TEST */ 
    inactivateTile(current);
  }
  else {
    console.log('NO QUALIFICATION: ', activeTileBacks.length, activeTileBacks);        /* TEST */
    limitButton(current);
  }
}

// Array of paths to the pictures on the back of the tiles
const tileBackPics = ["center / cover no-repeat url('../images/Concentration-EmmyBedCircle.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyBlackBag.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyFigurine.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyInCar.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyLisa.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyOnRob.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyPawsWindow.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmySuitcase.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyBedCircle.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyBlackBag.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyFigurine.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyInCar.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyLisa.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyOnRob.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmyPawsWindow.jpg')",
  "center / cover no-repeat url('../images/Concentration-EmmySuitcase.jpg')"];

// Randomly shuffle array
const shuffleArray = array => {
  let shuffledArray = array.slice();
  let currentPos = shuffledArray.length;
  while (currentPos !== 0) {
    let random = Math.floor(Math.random() * (currentPos));
    currentPos --;
    let temp = shuffledArray[currentPos];
    shuffledArray[currentPos] = shuffledArray[random];
    shuffledArray[random] = temp;
  }
  return shuffledArray;
}

// Create random layout of game tiles
let gameTileBacks = shuffleArray(tileBackPics);
