// Three sets of names to pick from
const emmyNames1 = [
  'Little M1ss Kitten', 'Little M2ss Kitten', 'Little M3ss Kitten', 'Little M4ss Kitten', 'Little M5ss Kitten', 'Little M26s Kitten'
];
const emmyNames2 = [
  'Little M6ss Kitten', 'Little M7ss Kitten', 'Little M8ss Kitten', 'Little M9ss Kitten', 'Little M10s Kitten', 'Little M27s Kitten'
];
const emmyNames3 = [
  'Little M11s Kitten', 'Little M12s Kitten', 'Little M13s Kitten', 'Little M14s Kitten', 'Little M15s Kitten', 'Little M28s Kitten'
];
const emmyNames4 = [
  'Little M16s Kitten', 'Little M17s Kitten', 'Little M18s Kitten', 'Little M19s Kitten', 'Little M20s Kitten', 'Little M29s Kitten'
];
const emmyNames5 = [
  'Little M21s Kitten', 'Little M22s Kitten', 'Little M23s Kitten', 'Little M24s Kitten', 'Little M25s Kitten', 'Little M30s Kitten'
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

// Function for game play
function delay(ms) {
  return new Promise (resolve => {
    setTimeout(() => {resolve('')}, ms);
  })
}
async function playGame() {
  counter = 0;                          /* TODO */
  let winner = pickNameAndGroup();
  gameActive = true;
  let showPlace = document.getElementsByClassName('names-display')[0];
  let randomName;
  let showAName;
  let displayedGroup = [];
  let picked = false;
  let bottom = false;
  while (gameActive) {
    showAName = document.createElement('p');

    while (!picked) {
      randomName = Math.floor(Math.random() * 6);
      if (!displayedGroup.some(name => name === chosenGroup[randomName])) {
        showAName.innerHTML = chosenGroup[randomName];
        displayedGroup.push(chosenGroup[randomName]);
        picked = true;
        bottom ? bottom = false : bottom = true;
        if (displayedGroup.length === 6) {
          displayedGroup = [];
        }
      }
    }
    picked = false;

    showAName.style.fontSize = '0.5rem';
    showAName.style.position = 'absolute';
    bottom ? showAName.style.bottom = '1%' : showAName.style.bottom = '95%';
    showAName.style.right = '10%';
    showPlace.appendChild(showAName);
    showAName.style.transition = 'all 1.5s';
    setTimeout(() => {
      showAName.style.fontSize = '1.25rem';
      bottom ? showAName.style.bottom = '95%' : showAName.style.bottom = '1%';
      showAName.style.right = '10%';
    }, 20)
    await delay(1180);
    showPlace.removeChild(showPlace.firstElementChild);
    counter ++;                          /* TODO */
    if (counter === 12) {             /* TODO */
      gameActive = false;
    }
  }
}

playGame();
