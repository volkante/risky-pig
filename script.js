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
let currentDice = 0;
let firstPlayerCurrentScore = 0;
let secondPlayerCurrentScore = 0;
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;

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
  // Assing the dice value to the current player based on "playing" class
  if (firstPlayerSection.classList.contains("playing")) {
    // if first player is playing
    firstPlayerCurrentScore += currentDice;
    if (currentDice == 1) {
      firstPlayerCurrentScore = 0;
      changeTurn();
    }
  } else {
    // if second player is playing
    secondPlayerCurrentScore += currentDice;
    if (currentDice == 1) {
      secondPlayerCurrentScore = 0;
      changeTurn();
    }
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

// Add current score to total score according to playing player
const holdScore = () => {
  // If first player is playing
  if (firstPlayerSection.classList.contains("playing")) {
    firstPlayerTotalScore += firstPlayerCurrentScore;
    firstPlayerCurrentScore = 0;
    displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
    displayText(firstPlayerTotalScoreSpan, firstPlayerTotalScore);
    changeTurn();
  } else {
    secondPlayerTotalScore += secondPlayerCurrentScore;
    secondPlayerCurrentScore = 0;
    displayText(secondPlayerCurrentScoreSpan, secondPlayerCurrentScore);
    displayText(secondPlayerTotalScoreSpan, secondPlayerTotalScore);
    changeTurn();
  }
};

////////// Add event listeners /////////////

// Add event listener to diceButton for dice rolling
diceButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
startButton.addEventListener("click", resetGame);
// Add event listener to hold button to add current scores to playing player when clicked "hold"
holdButton.addEventListener("click", holdScore);
