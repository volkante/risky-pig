"use Strict";

// Select html elements and assign them to variables
const firstPlayerSection = document.querySelector(".first-player-container");
const secondPlayerSection = document.querySelector(".second-player-container");
const startButton = document.querySelector(".start-button");
const firstPlayerTotalScoreSpan = document.querySelector(
  ".first-player-total-score span"
);
const firstPlayerCurrentScoreSpan = document.querySelector(
  ".first-player-current-score span"
);
const secondPlayerTotalScoreSpan = document.querySelector(
  ".second-player-total-score span"
);

const secondPlayerCurrentScoreSpan = document.querySelector(
  ".second-player-current-score span"
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
    resetTurn();
    currentDice = 0;
    firstPlayerCurrentScore = 0;
    secondPlayerCurrentScore = 0;
    firstPlayerTotalScore = 0;
    secondPlayerTotalScore = 0;
    displayText(diceResultSpan, currentDice);
    displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
    displayText(firstPlayerTotalScoreSpan, firstPlayerTotalScore);
    displayText(secondPlayerCurrentScoreSpan, secondPlayerCurrentScore);
    displayText(secondPlayerTotalScoreSpan, secondPlayerTotalScore);
  }
};

// Roll dice to start the game
const rollDice = () => {
  // Assign a random number between 1 - 6 to currentDice
  currentDice = Math.ceil(Math.random() * 6);
  // Set current dice to firstPlayerCurrentScore
  firstPlayerCurrentScore = currentDice;
  if (currentDice == 1) {
    changeTurn();
  }

  console.log("current dice: ", currentDice);
  // Display current dice result
  displayText(diceResultSpan, currentDice);
  displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
  displayText(firstPlayerTotalScoreSpan, firstPlayerTotalScore);
  displayText(secondPlayerCurrentScoreSpan, secondPlayerCurrentScore);
  displayText(secondPlayerTotalScoreSpan, secondPlayerTotalScore);
};

// Display text content of an element
const displayText = (element, content) => {
  element.textContent = content;
};

// Change turn by adding or removing "playing" class
const changeTurn = () => {
  if (firstPlayerSection.classList.contains("playing")) {
    firstPlayerSection.classList.remove("playing");
    secondPlayerSection.classList.add("playing");
  } else {
    secondPlayerSection.classList.remove("playing");
    firstPlayerSection.classList.add("playing");
  }
};

// Reset turn by making player 1 playing
const resetTurn = () => {
  if (secondPlayerSection.classList.contains("playing")) {
    secondPlayerSection.classList.remove("playing");
    firstPlayerSection.classList.add("playing");
  }
};

////////// Add event listeners /////////////

// Add event listener to diceButton for dice rolling
diceButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
startButton.addEventListener("click", resetGame);
