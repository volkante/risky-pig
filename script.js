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
const rollButton = document.querySelector(".roll-button");
const holdButton = document.querySelector(".hold-button");
const diceResultSpan = document.querySelector(".dice-result");
const winnerTextParagraph = document.querySelector(".winner-text");
const winnerTextSpan = document.querySelector(".winner-text span");

// Initialize variables to store dice values
let currentDice = 0;
let firstPlayerCurrentScore = 0;
let secondPlayerCurrentScore = 0;
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;

////////// Define functions /////////

// Reset game
const resetGame = () => {
  //if winner text is not hidden, hide it and enable buttons!.
  if (!winnerTextParagraph.classList.contains("hidden")) {
    winnerTextParagraph.classList.add("hidden");
    enableElement(rollButton);
    enableElement(holdButton);
  }
  // If the dice is rolled do the following
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
  // Display current dice result and scores
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

// Disable element if needed
const disableElement = (element) => {
  element.disabled = true;
};

const enableElement = (element) => {
  element.disabled = false;
};

// Add current score to total score according to playing player
const holdScore = () => {
  // If first player is playing
  if (firstPlayerSection.classList.contains("playing")) {
    firstPlayerTotalScore += firstPlayerCurrentScore;
    firstPlayerCurrentScore = 0;
    displayText(firstPlayerCurrentScoreSpan, firstPlayerCurrentScore);
    displayText(firstPlayerTotalScoreSpan, firstPlayerTotalScore);
    // finish game and display winner if totalscore is bigger than 20
    finishGame(firstPlayerTotalScore);
    changeTurn();
  } else {
    // If second player is playing
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
  if (totalScore >= 10) {
    disableElement(rollButton);
    disableElement(holdButton);
    // if the winner is firstplayer
    if (totalScore == firstPlayerTotalScore) {
      displayText(winnerTextSpan, "PLAYER 1");
      winnerTextParagraph.classList.remove("hidden");
    } else {
      // if the winner is secondplayer
      displayText(winnerTextSpan, "PLAYER 2");
      winnerTextParagraph.classList.remove("hidden");
    }
  }
};

////////// Add event listeners /////////////

// Add event listener to rollButton for dice rolling
rollButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
startButton.addEventListener("click", resetGame);
// Add event listener to hold button to add current scores to playing player when clicked "hold"
holdButton.addEventListener("click", holdScore);
