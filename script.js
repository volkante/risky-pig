"use strict";

//TODO: display score'lar iki yerde geçiyor 4'lü tek bir fonksiyonda toplanabilir.

// Select html elements and assign them to variables
const player0Section = document.querySelector(".first-player-container");
const player1Section = document.querySelector(".second-player-container");
const newGameButton = document.querySelector(".new-game-button");
const player0TotalScoreSpan = document.querySelector(
  ".first-player-total-score span"
);
const player0CurrentScoreSpan = document.querySelector(
  ".first-player-current-score span"
);
const player1TotalScoreSpan = document.querySelector(
  ".second-player-total-score span"
);
const player1CurrentScoreSpan = document.querySelector(
  ".second-player-current-score span"
);
const rollButton = document.querySelector(".roll-button");
const holdButton = document.querySelector(".hold-button");
const winnerTextParagraph = document.querySelector(".winner-text");
const winnerTextSpan = document.querySelector(".winner-text span");
const dicePicImg = document.querySelector(".dice-pic");

// Initialize variables to store dice values
let currentDice = 0;
// Store scores in arrays by player index (player 1 index= 0; player 2 index = 1)
const totalScores = [0, 0];
const currentScores = [0, 0];
// Assing active player to 0 if first player is playing, 1 if second is playing
let activePlayer = 0;

////////// Define functions /////////

// Display text content of an element
const displayText = (element, content) => {
  element.textContent = content;
};

// Enable button if disabled and vice versa
const toggleElement = (element) => {
  element.disabled = !element.disabled;
};

// Generate a random number between 1 and 6
const generateRandomNumber = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

// Reset turn by giving turn to first player
const resetTurn = () => {
  if (activePlayer === 1) {
    player1Section.classList.remove("playing");
    player0Section.classList.add("playing");
    activePlayer = 0;
  }
};

// Change turn by adding or removing "playing" class (toggle) and changing active Player
const changeTurn = () => {
  player0Section.classList.toggle("playing");
  player1Section.classList.toggle("playing");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Add current dice value to currently playing player's current score unless dice is 1
// If dice is 1, set current players score to 0 and change turn
const updateCurrentScores = () => {
  currentScores[activePlayer] += currentDice;
  if (currentDice == 1) {
    currentScores[activePlayer] = 0;
    changeTurn();
  }
};

// Reset all scores
const resetScores = () => {
  currentDice = 0;
  totalScores.forEach((item, index) => (totalScores[index] = 0));
  currentScores.forEach((item, index) => (totalScores[index] = 0));
};

// Reset game
const resetGame = () => {
  // If winner text is not hidden because of an already finished game, hide it and enable buttons
  if (!winnerTextParagraph.classList.contains("hidden")) {
    winnerTextParagraph.classList.add("hidden");
    toggleElement(rollButton);
    toggleElement(holdButton);
  }
  // If the dice is rolled(if the game has been played), reset scores to 0 and display it and reset turn.
  if (currentDice) {
    resetScores();
    dicePicImg.classList.add("hidden");
    displayText(player0CurrentScoreSpan, currentScores[0]);
    displayText(player0TotalScoreSpan, totalScores[0]);
    displayText(player1CurrentScoreSpan, currentScores[1]);
    displayText(player1TotalScoreSpan, currentScores[1]);
    resetTurn();
  }
};

// Create a random num 1-6; update current player's score; display it
const rollDice = () => {
  // Assign a random number between 1 - 6 to currentDice
  currentDice = generateRandomNumber();
  // Show the dice result as picture
  dicePicImg.src = `./assets/dice-${currentDice}.png`;
  dicePicImg.classList.remove("hidden");
  // Update scores according to the player's turn and change turn when dice gets 1
  updateCurrentScores();
  // Display current dice result and scores
  //displayText(diceResultSpan, currentDice);
  displayText(player0CurrentScoreSpan, currentScores[0]);
  displayText(player1CurrentScoreSpan, currentScores[1]);
};

// Add current score to total score according to playing player
const holdScore = () => {
  totalScores[activePlayer] += currentScores[activePlayer];
  currentScores[activePlayer] = 0;
  displayText(player0CurrentScoreSpan, currentScores[0]);
  displayText(player0TotalScoreSpan, totalScores[0]);
  displayText(player1CurrentScoreSpan, currentScores[1]);
  displayText(player1TotalScoreSpan, totalScores[1]);
  // Finish game and display winner if totalscore is bigger than 30
  finishGame(totalScores);
  changeTurn();
};

// Check if any player has reached to 30 total points. If that's the case, disable buttons and show winner
const finishGame = (totalScoresArr) => {
  for (let i = 0; i < totalScoresArr.length; i++) {
    if (totalScores[i] >= 30) {
      toggleElement(rollButton);
      toggleElement(holdButton);
      displayText(winnerTextSpan, `Player ${i + 1}`);
      winnerTextParagraph.classList.remove("hidden");
    }
  }
};

////////// Add event listeners /////////////

// Add event listener to rollButton for dice rolling
rollButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
newGameButton.addEventListener("click", resetGame);
// Add event listener to hold button to add current scores to playing player when clicked "hold"
holdButton.addEventListener("click", holdScore);
