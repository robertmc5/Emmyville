// Seventeen 8-ball answers to draw from
const eightBallAnswers = [
  'Yes, be‑claws I see it', 'It is purr‑fectly so', 'Paw‑sitively yes', 
  'Let me scratch at that for awhile', "Not sure, there's a hairball on the 8‑ball", 'Just paws for now, ask again later', 
  "You've got to be kitten", "I'm feline a no", 'Not if you had nine lives', 
  "Your question is freakin' me‑owt", "Whatever happens, it won't be a cat‑astrophe", "I can't tell right meow", 
  "Your question doesn't seem fur real","I'm litter‑ally sure, yes", 'Purr‑haps, maybe so', 
  "It's a no, cat's all", "Paw‑lease it's certainly so"
];

// Function chooses random 8-ball answer
let answer = '';
const pickAnswer = () => {
  let randomNum = Math.floor(Math.random() * 17);
  answer = eightBallAnswers[randomNum];
  return answer;
}

// Render an answer onscreen to the question asked  ===========================
function answerQuestion() {
  document.getElementById('btn').removeEventListener('click', checkEntry);
  document.getElementById('question').removeEventListener('keydown', enterKey);

  let showPlace = document.getElementById('answer');

  let show8ball = document.createElement('img');
  show8ball.src = "../images/EightBall-BilliardBall.png";
  show8ball.id = 'magicBall';
  show8ball.style.width = '12.5rem';
  show8ball.style.opacity = '0';
  showPlace.appendChild(show8ball);

  let showCatFace = document.createElement('img');
  showCatFace.src = "../images/EightBall-CatFace.png";
  showCatFace.id = 'catFace';
  showCatFace.style.width = '12.5rem';
  showCatFace.style.opacity = '0';
  showPlace.appendChild(showCatFace);

  answer = pickAnswer();
  let showAnswer = document.createElement('p');
  showAnswer.innerHTML = answer;
  showAnswer.id = 'answerText';
  showAnswer.style.fontSize = '1.5rem';
  showAnswer.style.opacity = '0';
  showPlace.appendChild(showAnswer);
}

// Function to verify if something was written in the question field
function checkEntry() {
    if (question.value.trim().length > 4) {
      answerQuestion();
    }
}

// Clear input field upon reload of page
question.value = '';

// Register event listener for clicking the Enter button
document.getElementById('btn').addEventListener('click', checkEntry);

// Register event listener for pressing the Enter key
const enterKey = (e) => {
  if (e.key === 'Enter') {
    checkEntry();
  }
}
document.getElementById('question').addEventListener('keydown', enterKey);
