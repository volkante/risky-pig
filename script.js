"use strict";

// Select html elements and assign them to variables
const firstPlayerSection = document.querySelector(".first-player-container");
const secondPlayerSection = document.querySelector(".second-player-container");
const newGameButton = document.querySelector(".new-game-button");
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
const rollButton = document.querySelector(".roll-button");
const holdButton = document.querySelector(".hold-button");
const winnerTextParagraph = document.querySelector(".winner-text");
const winnerTextSpan = document.querySelector(".winner-text span");
const dicePicImg = document.querySelector(".dice-pic");

// Initialize variables to store dice values
let currentDice = 0;
let firstPlayerCurrentScore = 0;
let secondPlayerCurrentScore = 0;
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;
let activePlayer = 1;

////////// Define functions /////////

// Display text content of an element
const displayText = (element, content) => {
  element.textContent = content;
};

// Disable element
const disableElement = (element) => {
  element.disabled = true;
};

// Enable element
const enableElement = (element) => {
  element.disabled = false;
};

// Generate a random number between 1 and 6
const generateRandomNumber = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

// Reset turn by giving turn to first player
const resetTurn = () => {
  if (activePlayer === 2) {
    secondPlayerSection.classList.remove("playing");
    firstPlayerSection.classList.add("playing");
    activePlayer = 1;
  }
};

// Change turn by adding or removing "playing" class (toggle class) and changing active Player
const changeTurn = () => {
  firstPlayerSection.classList.toggle("playing");
  secondPlayerSection.classList.toggle("playing");
  activePlayer = activePlayer === 1 ? 2 : 1;
};

// Add current dice value to currently playing player's current score unless dice is 1
const updateCurrentScores = () => {
  // If first player is playing
  if (activePlayer == 1) {
    firstPlayerCurrentScore += currentDice;
    // If the current dice is 1, set the current score of first player to 0 and change turn.
    if (currentDice == 1) {
      firstPlayerCurrentScore = 0;
      changeTurn();
    }
    // If second player is playing
  } else {
    secondPlayerCurrentScore += currentDice;
    // If the current dice is 1, set the current score of second player to 0 and change turn.
    if (currentDice == 1) {
      secondPlayerCurrentScore = 0;
      changeTurn();
    }
  }
};

// Reset all scores
const resetScores = () => {
  currentDice = 0;
  firstPlayerCurrentScore = 0;
  secondPlayerCurrentScore = 0;
  firstPlayerTotalScore = 0;
  secondPlayerTotalScore = 0;
};

// Reset game
const resetGame = () => {
  // If winner text is not hidden because of an already finished game, hide it and enable buttons
  if (!winnerTextParagraph.classList.contains("hidden")) {
    winnerTextParagraph.classList.add("hidden");
    enableElement(rollButton);
    enableElement(holdButton);
  }
  // If the dice is rolled(if the game has been played), reset scores to 0 and display it and reset turn.
  if (currentDice) {
    resetScores();
    dicePicImg.classList.add("hidden");
    //displayText(diceResultSpan, currentDice);
    displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
    displayText(firstPlayerTotalScoreSpan, firstPlayerTotalScore);
    displayText(secondPlayerCurrentScoreSpan, secondPlayerCurrentScore);
    displayText(secondPlayerTotalScoreSpan, secondPlayerTotalScore);
    resetTurn();
  }
};

// create a random num 1-6; update current player's score; display it
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
  displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
  displayText(secondPlayerCurrentScoreSpan, secondPlayerCurrentScore);
};

// Add current score to total score according to playing player
const holdScore = () => {
  // If first player is playing
  if (activePlayer === 1) {
    firstPlayerTotalScore += firstPlayerCurrentScore;
    firstPlayerCurrentScore = 0;
    displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
    displayText(firstPlayerTotalScoreSpan, firstPlayerTotalScore);
    // finish game and display winner if totalscore is bigger than 20
    finishGame(firstPlayerTotalScore);
    changeTurn();
    // If second player is playing
  } else {
    secondPlayerTotalScore += secondPlayerCurrentScore;
    secondPlayerCurrentScore = 0;
    displayText(secondPlayerCurrentScoreSpan, secondPlayerCurrentScore);
    displayText(secondPlayerTotalScoreSpan, secondPlayerTotalScore);
    // finish game and display winner if totalscore is bigger than 20
    finishGame(secondPlayerTotalScore);
    changeTurn();
  }
};

const finishGame = (totalScore) => {
  if (totalScore >= 30) {
    disableElement(rollButton);
    disableElement(holdButton);
    // if the winner is firstplayer
    if (totalScore == firstPlayerTotalScore) {
      displayText(winnerTextSpan, "PLAYER 1");
      winnerTextParagraph.classList.remove("hidden");
      // if the winner is secondplayer
    } else {
      displayText(winnerTextSpan, "PLAYER 2");
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
