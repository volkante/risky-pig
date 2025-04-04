"use Strict";

// Select html elements and assign them to variables
const startButton = document.querySelector(".start-button");
const firstPlayerTotalScoreSpan = document.querySelector(
  ".first-player-total-score"
);
const firstPlayerCurrentScoreSpan = document.querySelector(
  ".first-player-current-score"
);
const secondPlayerTotalScoreSpan = document.querySelector(
  ".second-player-total-score"
);
const secondPlayerCurrentScoreSpan = document.querySelector(
  ".second-player-current-score"
);
const diceButton = document.querySelector(".dice-button");
const holdButton = document.querySelector(".hold-button");
const diceResultSpan = document.querySelector(".dice-result");

// Declare variables to store dice values
let currentDice;
let firstPlayerCurrentScore;
let secondPlayerCurrentScore;
let firstPlayerTotalScore;
let secondPlayerTotalScore;

////////// Define functions /////////

// Reset game
const resetGame = () => {
  if (currentDice) {
    // Set current dice to null
    currentDice = null;
    // Display an empty string in the place of dice
    displayText(diceResultSpan, currentDice);
  }
};

// Roll dice to start the game
const rollDice = () => {
  // Assign a random number between 1 - 6 to currentDice
  currentDice = Math.ceil(Math.random() * 6);
  console.log("current dice: ", currentDice);
  // Display current dice result
  displayText(diceResultSpan, currentDice);
};

// Display text content of an element
const displayText = (element, content) => {
  element.textContent = content;
};

////////// Add event listeners /////////////

// Add event listener to diceButton for dice rolling
diceButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
startButton.addEventListener("click", resetGame);
