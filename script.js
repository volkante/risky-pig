"use Strict";

// Select elements
const startButton = document.querySelector(".start-button");
const firstPlayerTotalScoreSpan = document.querySelector(
  ".first-player-total-score"
);
const firstPlayerCurrentScore = document.querySelector(
  ".first-player-current-score"
);
const secondPlayerTotalScore = document.querySelector(
  ".second-player-total-score"
);
const secondPlayerCurrentScore = document.querySelector(
  ".second-player-current-score"
);
const diceButton = document.querySelector(".dice-button");
const holdButton = document.querySelector(".hold-button");
const diceResultSpan = document.querySelector(".dice-result");

// Declare constant for dice roll
let currentDice;

// Define functions

// Reset game
const resetGame = () => {
  // Set current dice to 0
  currentDice = 0;
  // Display dice result as 0
  displayText(diceResultSpan, currentDice);
};

// Roll dice to start the game
const rollDice = () => {
  // Assign a random number between 1 - 6 to currentDice
  currentDice = Math.ceil(Math.random() * 6);
  console.log("current dice: ", currentDice);
  // Display current dice result
  displayText(diceResultSpan, currentDice);
};

//Display text content of an element
const displayText = (element, content) => {
  element.textContent = content;
};

// Add event listener to diceButton for dice rolling
diceButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
startButton.addEventListener("click", resetGame);
