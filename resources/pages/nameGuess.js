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
  'Smitten Kitten', 'Baby Fat', 'Marshmellow Fluff', 'Squeak Toy Joy', 'The 19-Toed One', 'Emmycat'
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
guess1.value = '';
guess2.value = '';
guess3.value = '';
async function playGame() {
  winner = pickNameAndGroup();
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
      showAName.style.bottom = '75%';
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
        right ? showAName.style.right = '35%' : showAName.style.right = '2%';
      }
      showAName.style.transform = 'rotate(5deg)';
    }, 20)
    await delay(1180);
    showPlace.removeChild(showPlace.lastElementChild);
  }
}

// Invoke the game function
playGame();

// Function to check for winning guess
const checkForWinner = (guess) => {
  return guess.toLowerCase().trim() === winner.toLowerCase() ? true : false;
}

// Function to inform of a winning guess
let messagePlace = document.getElementsByTagName('form')[0];
const showWinner = () => {
  let winnerMessage = document.createElement('p');
  winnerMessage.innerHTML = "Yes! You got it! <br> <span>YOU WIN!</span> <br> Congratulations!";
  winnerMessage.style.fontSize = '1.25rem';
  winnerMessage.style.color = 'black';
  winnerMessage.style.lineHeight = '2rem';
  winnerMessage.style.paddingTop = '1rem';
  messagePlace.appendChild(winnerMessage);
  let innerWinner = winnerMessage.querySelector('span');
  innerWinner.style.fontSize = '1.5rem';
  innerWinner.style.color = 'white';
  innerWinner.style.textShadow = '1px 1px 1px black';
  innerWinner.style.paddingLeft = '1rem';
}

// Submit guess - Event handler function
const enterBtn = (e) => {
  if (e.target.id === 'btn1' || e.target.id === 'guess1') {
    if (checkForWinner(guess1.value)) {
      gameActive = false;
      document.getElementById('btn1').removeEventListener('click', checkEntry);
      document.getElementById('guess1').removeEventListener('keydown', enterKey);
      document.getElementById('guess1').style.backgroundColor = ('rgb(204, 230, 204)');
      document.getElementById('btn1').focus();
      showWinner();
    }
    else {
      document.getElementById('btn1').removeEventListener('click', checkEntry);
      document.getElementById('guess1').removeEventListener('keydown', enterKey);
      document.getElementById('btn1').style.backgroundColor = ('rgb(169, 169, 169)');
      document.getElementById('guess1').style.backgroundColor = ('rgb(255, 204, 204)');
      let firstNoMessage = document.createElement('p');
      firstNoMessage.innerHTML = "Nope. That's not it.";
      messagePlace.appendChild(firstNoMessage);
      messagePlace.appendChild(label2);
      document.getElementById('label2').style.display = 'block';
      messagePlace.appendChild(guess2);
      document.getElementById('guess2').style.display = 'inline-block';
      document.getElementById('guess2').focus();
      messagePlace.appendChild(btn2);
      document.getElementById('btn2').style.display = 'inline-block';
    }
  }
  if (e.target.id === 'btn2' || e.target.id === 'guess2') {
    if (checkForWinner(guess2.value)) {
      gameActive = false;
      document.getElementById('btn2').removeEventListener('click', checkEntry);
      document.getElementById('guess2').removeEventListener('keydown', enterKey);
      document.getElementById('guess2').style.backgroundColor = ('rgb(204, 230, 204)');
      document.getElementById('btn2').focus();
      showWinner();
    }
    else {
      document.getElementById('btn2').removeEventListener('click', checkEntry);
      document.getElementById('guess2').removeEventListener('keydown', enterKey);
      document.getElementById('btn2').style.backgroundColor = ('rgb(169, 169, 169)');
      document.getElementById('guess2').style.backgroundColor = ('rgb(255, 204, 204)');
      let secondNoMessage = document.createElement('p');
      secondNoMessage.innerHTML = "No. Sorry.";
      messagePlace.appendChild(secondNoMessage);
      messagePlace.appendChild(label3);
      document.getElementById('label3').style.display = 'block';
      messagePlace.appendChild(guess3);
      document.getElementById('guess3').style.display = 'inline-block';
      document.getElementById('guess3').focus();
      messagePlace.appendChild(btn3);
      document.getElementById('btn3').style.display = 'inline-block';
    }
  }
  if (e.target.id === 'btn3' || e.target.id === 'guess3') {
    if (checkForWinner(guess3.value)) {
      gameActive = false;
      document.getElementById('btn3').removeEventListener('click', checkEntry);
      document.getElementById('guess3').removeEventListener('keydown', enterKey);
      document.getElementById('guess3').style.backgroundColor = ('rgb(204, 230, 204)');
      document.getElementById('btn3').focus();
      showWinner();
    }
    else {
      gameActive = false;
      document.getElementById('btn3').removeEventListener('click', checkEntry);
      document.getElementById('guess3').removeEventListener('keydown', enterKey);
      document.getElementById('btn3').style.backgroundColor = ('rgb(169, 169, 169)');
      document.getElementById('guess3').style.backgroundColor = ('rgb(255, 204, 204)');
      let thirdNoMessage = document.createElement('p');
      thirdNoMessage.innerHTML = "Awww. No, not this time.";
      messagePlace.appendChild(thirdNoMessage);
      messagePlace.appendChild(setupAnswer);
      document.getElementById('setupAnswer').style.display = 'block';
      let missedAnswer = document.createElement('p');
      missedAnswer.id = "answer";
      missedAnswer.innerHTML = winner;
      messagePlace.appendChild(missedAnswer);
    }
  }
}

// Check function to see if guess is a valid attempt
function checkEntry(e) {
  if (e.target.id === 'btn1' || e.target.id === 'guess1') {
    if (chosenGroup.some((nn) => nn.toLowerCase() === guess1.value.toLowerCase().trim())) {
      enterBtn(e);
    }
  }
  if (e.target.id === 'btn2' || e.target.id === 'guess2') {
    if (chosenGroup.some((nn) => nn.toLowerCase() === guess2.value.toLowerCase().trim())) {
      enterBtn(e);
    }
  }
  if (e.target.id === 'btn3' || e.target.id === 'guess3') {
    if (chosenGroup.some((nn) => nn.toLowerCase() === guess3.value.toLowerCase().trim())) {
      enterBtn(e);
    }
  }
}

// Register event listeners for clicking the Enter buttons
document.getElementById('btn1').addEventListener('click', checkEntry);
document.getElementById('btn2').addEventListener('click', checkEntry);
document.getElementById('btn3').addEventListener('click', checkEntry);

// Register event listener for pressing the Enter key
const enterKey = (e) => {
  if (e.key === 'Enter') {
    checkEntry(e);
  }
}
document.getElementById('guess1').addEventListener('keydown', enterKey);
document.getElementById('guess2').addEventListener('keydown', enterKey);
document.getElementById('guess3').addEventListener('keydown', enterKey);
