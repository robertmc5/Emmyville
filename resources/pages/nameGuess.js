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
async function playGame() {
  counter = 0;                          /* TODO */
  let winner = pickNameAndGroup();
  let gameActive = true;
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
        right ? showAName.style.right = '40%' : showAName.style.right = '2%';
      }
      showAName.style.transform = 'rotate(5deg)';
    }, 20)
    await delay(1180);
    showPlace.removeChild(showPlace.lastElementChild);
    counter ++;                          /* TODO */
    if (counter === 30) {             /* TODO */
      gameActive = false;
    }
  }
}

playGame();
