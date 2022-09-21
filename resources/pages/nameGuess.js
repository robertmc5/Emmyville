// Three sets of names to pick from
const emmyNames1 = [
  'Emmycat', 'Kitten', 'Bubby Cubs', 'Fluff', 'Schmoopy', 
  'Smitten Kitten', 'Fuzzy Butt', 'Princess Ponytrot', 'Baby Fat', 'Squeakers'
];
const emmyNames2 = [
  'Little Miss Kitten', 'Fuzzy Button', 'Kitty Mitty', 'Scoochie Booch', 'Marshmallow Fluff', 
  'Schmubby Bub', 'Baby Fluff', 'The 19-Toed One', 'Bubbyduders', 'Baby Girl'
];
const emmyNames3 = [
  'Kittenduders', 'Squeak Toy Joy', 'Kitten Mitten', 'Little Bit', 'Scoochie Bear', 
  'Fatticus Catticus', 'Bubbie Schmubs', 'Fluffy Muff', 'Baby Kitten', 'Squeaky Reminder'
];

// Helper function chooses the set of names used for this game
let chosenGroup = [];
const nameGroup = () => {
  let randomGroup = Math.floor(Math.random() * 3);
  switch (randomGroup) {
    case 0: return emmyNames1;
    case 1: return emmyNames2;
    case 2: return emmyNames3;
  }
}

// Function chooses the name to guess for this game and assigns the name group
const pickNameAndGroup = () => {
  chosenGroup = nameGroup();
  let randomName = Math.floor(Math.random() * 10);
  let chosenName = chosenGroup[randomName];
  return chosenName;
}

// Function for game play
const playGame = () => {
  counter = 0;                          /* TODO */
  let winner = pickNameAndGroup();
  gameActive = true;
  let showPlace = document.getElementsByClassName('names-display')[0];
  let randomName;
  let showAName;
  while (gameActive) {
    randomName = Math.floor(Math.random() * 10);
    showAName = document.createElement('p');
    showAName.innerHTML = chosenGroup[randomName];

    showAName.style.fontSize = '0.75rem';
    showAName.style.position = 'absolute';
    showAName.style.bottom = '3%';
    showAName.style.left = '3%';
    showPlace.appendChild(showAName);
    showAName.style.transition = 'all 1.5s';
    setTimeout(() => {
      showAName.style.fontSize = '1.25rem';
      showAName.style.bottom = '80%';
      showAName.style.left = '67%';
    }, 10)
    // showPlace.removeChild(showPlace.firstElementChild);
    counter ++;                          /* TODO */
    if (counter === 7) {             /* TODO */
      gameActive = false;
    }
  }
}

playGame();
