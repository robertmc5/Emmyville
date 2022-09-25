// Three sets of names to pick from
const emmyNames1 = [
  'Baby Kitten', 'Bubby Cubs', 'Schmoopy', 'Fuzzy Butt', 'Princess Ponytrot', 'Kitty Mitty'
];
const emmyNames2 = [
  'Little Miss Kitten', 'Fuzzy Button', 'Scoochie Booch', 'Schmubby Bub', 'Bubbyduders', 'Baby Fluff'
];
const emmyNames3 = [
  'Kittenduders', 'Little Bit', 'Scoochie Bear', 'Kitten', 'Fluffy Muff', 'Squeaky Reminder'
];
const emmyNames4 = [
  'Smitten Kitten', 'Baby Fat', 'Marshmallow Fluff', 'Squeak Toy Joy', 'The 19-Toed One', 'Emmycat'
];
const emmyNames5 = [
  'Squeakers', 'Kitten Mitten', 'Bubbie Schmubs', 'Fatticus Catticus', 'Baby Girl', 'Fluff'
];

// Helper function chooses the set of names used for this game
let chosenGroup = [];
const nameGroup = () => {
  let randomGroup = Math.floor(Math.random() * 5);
  switch (randomGroup) {
    case 0: return emmyNames1;
    case 1: return emmyNames2;
    case 2: return emmyNames3;
    case 3: return emmyNames4;
    case 4: return emmyNames5;
  }
}

// Function chooses the name to guess for this game and assigns the name group
let winner;
const pickNameAndGroup = () => {
  chosenGroup = nameGroup();
  let randomName = Math.floor(Math.random() * 6);
  let chosenName = chosenGroup[randomName];
  return chosenName;
}

// Helper function for delay in game play
function delay(ms) {
  return new Promise (resolve => {
    setTimeout(() => {resolve('')}, ms);
  })
}

// Helper function for display of names relative to viewport width
function displayDirection(e) {
  if (e.matches) {
    verticle = true;
  }
  else {
    verticle = false;
  }
}

// Function to play game
let gameActive = true;
async function playGame() {
  counter = 0;                                           /* TODO */
  pickNameAndGroup(); winner = 'Fluff';                   /* PUT BACK */
  let showPlace = document.getElementById('games');
  let randomName;
  let showAName;
  let displayedGroup = [];
  let picked = false;
  let bottom = false;
  let right = false;
  const mM = window.matchMedia("(min-width: 800px)");
  displayDirection(mM);
  mM.addEventListener('change', displayDirection);
  while (gameActive) {
    showAName = document.createElement('p');
    while (!picked) {
      randomName = Math.floor(Math.random() * 6);
      if (!displayedGroup.some(name => name === chosenGroup[randomName])) {
        showAName.innerHTML = chosenGroup[randomName];
        displayedGroup.push(chosenGroup[randomName]);
        picked = true;
        bottom ? bottom = false : bottom = true;
        right ? right = false : right = true;
        if (displayedGroup.length === 6) {
          displayedGroup = [];
        }
      }
    }
    picked = false;
    showAName.style.fontSize = '0.5rem';
    showAName.style.position = 'absolute';
    showAName.style.transform = 'rotate(-180deg)';
    if (verticle) {
      bottom ? showAName.style.bottom = '10%' : showAName.style.bottom = '95%';
      showAName.style.right = '10%';
    }
    if (!verticle) {
      showAName.style.bottom = '83%';
      right ? showAName.style.right = '4%' : showAName.style.right = '75%';
    }
    showPlace.appendChild(showAName);
    showAName.style.transition = 'all 1.5s ease';
    setTimeout(() => {
      showAName.style.fontSize = '1.5rem';
      if (verticle) {
        bottom ? showAName.style.bottom = '95%' : showAName.style.bottom = '7%';
      }
      if (!verticle) {
        right ? showAName.style.right = '37%' : showAName.style.right = '2%';
      }
      showAName.style.transform = 'rotate(5deg)';
    }, 20)
    await delay(1180);
    showPlace.removeChild(showPlace.lastElementChild);
    counter ++;                          /* TODO */
    if (counter === 2) {             /* TODO */
      gameActive = false;
    }
  }
}

// Invoke the game function
playGame();

// Function to check for winning guess
const checkForWinner = (guess) => {
  return guess.toLowerCase() === winner.toLowerCase() ? true : false;
}

// Function to inform of a winning guess
let messagePlace = document.getElementsByTagName('form')[0];
const showWinner = () => {
  let winnerMessage = document.createElement('p');
  winnerMessage.innerHTML = "Yes! You got it! <br> <span>YOU WIN!</span> <br> Congratulations!";
  winnerMessage.style.fontSize = '1.25rem';
  winnerMessage.style.color = 'black';
  messagePlace.appendChild(winnerMessage);
  let innerWinner = winnerMessage.querySelector('span');
  innerWinner.style.fontSize = '1.5rem';
  innerWinner.style.color = 'white';
  innerWinner.style.textShadow = '1px 1px 1px black';
}

// Submit guess
const enterBtn = (e) => {
  if (e.target.id === 'btn1') {
    if (checkForWinner(guess1.value)) {
      gameActive = false;
      document.getElementById('guess1').style.backgroundColor = ('rgb(204, 230, 204)');
      document.getElementById('btn1').removeEventListener('click', enterBtn);
      showWinner();
    }
    else {
      document.getElementById('btn1').removeEventListener('click', enterBtn);
      document.getElementById('btn1').style.backgroundColor = ('rgb(169, 169, 169)');
      document.getElementById('guess1').style.backgroundColor = ('rgb(255, 204, 204)');
      let firstNoMessage = document.createElement('p');
      firstNoMessage.innerHTML = "Nope. That's not it.";
      messagePlace.appendChild(firstNoMessage);
      setTimeout(() => {
      document.getElementById('label2').style.display = 'block';
      document.getElementById('guess2').style.display = 'inline-block';
      document.getElementById('btn2').style.display = 'inline-block';
      }, 1200)
    }
  }
}

// Register event listeners for clicking the Enter buttons
document.getElementById('btn1').addEventListener('click', enterBtn);
document.getElementById('btn2').addEventListener('click', enterBtn);
document.getElementById('btn3').addEventListener('click', enterBtn);

// Register event listener for pressing KEYS
document.getElementById('goToMain').addEventListener('click', enterKey);
