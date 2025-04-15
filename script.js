"use strict";

//TODO-1 Scorespanlari gösterme işini dinamikleştirmek
//TODO-2 Playing=true diye boolean bir value tutmak,bitince false yapmak. buttonlarla oynmaya gerek kalmaması. Böylece butonları disable enable etme kodlarını silebilmek?

// Select html elements and assign them to variables
const player0Section = document.querySelector(".first-player-container");
const player1Section = document.querySelector(".second-player-container");
const newGameButton = document.querySelector(".new-game-button");
const player0TotalScoreSpan = document.querySelector(
  ".player-0-total-score span"
);
const player0CurrentScoreSpan = document.querySelector(
  ".player-0-current-score span"
);
const player1TotalScoreSpan = document.querySelector(
  ".player-1-total-score span"
);
const player1CurrentScoreSpan = document.querySelector(
  ".player-1-current-score span"
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
// Store playing value as a boolean to watch the games status. Events on roll and hold button will initiate, only if playing is true.
let playing = true;

////////// Define functions /////////

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
  playing = true;
  // If winner text is not hidden because of an already finished game, hide it
  if (!winnerTextParagraph.classList.contains("hidden")) {
    winnerTextParagraph.classList.add("hidden");
  }
  // If the dice is rolled(if the game has started), reset scores to 0 and display it and reset turn.
  if (currentDice) {
    resetScores();
    dicePicImg.classList.add("hidden");
    player0CurrentScoreSpan.textContent = currentScores[0];
    player0TotalScoreSpan.textContent = totalScores[0];
    player1CurrentScoreSpan.textContent = currentScores[1];
    player1TotalScoreSpan.textContent = totalScores[1];
    resetTurn();
  }
};

// Create a random num 1-6; update current player's score; display it
const rollDice = () => {
  if (playing) {
    // Assign a random number between 1 - 6 to currentDice
    currentDice = generateRandomNumber();
    // Show the dice result as picture
    dicePicImg.src = `./assets/dice-${currentDice}.png`;
    dicePicImg.classList.remove("hidden");
    // Update scores according to the player's turn and change turn when dice gets 1
    updateCurrentScores();
    // Display current dice result and scores
    player0CurrentScoreSpan.textContent = currentScores[0];
    player1CurrentScoreSpan.textContent = currentScores[1];
  }
};

// Add current score to total score according to playing player
const holdScore = () => {
  if (playing) {
    totalScores[activePlayer] += currentScores[activePlayer];
    currentScores[activePlayer] = 0;
    player0CurrentScoreSpan.textContent = currentScores[0];
    player0TotalScoreSpan.textContent = totalScores[0];
    player1CurrentScoreSpan.textContent = currentScores[1];
    player1TotalScoreSpan.textContent = totalScores[1];
    // Finish game and display winner if totalscore is bigger than 30
    finishGame(totalScores);
    changeTurn();
  }
};

// Check if active player has reached to 30 total points. If that's the case, set playing variable to false and display the winner.
const finishGame = (totalScoresArr) => {
  if (totalScoresArr[activePlayer] >= 30) {
    playing = false;
    winnerTextSpan.textContent = `Player ${activePlayer + 1}`;
    winnerTextParagraph.classList.remove("hidden");
  }
};

////////// Add event listeners /////////////

// Add event listener to rollButton for dice rolling
rollButton.addEventListener("click", rollDice);
// Add event listener to new game button for resetting dice and scores
newGameButton.addEventListener("click", resetGame);
// Add event listener to hold button to add current scores to playing player when clicked "hold"
holdButton.addEventListener("click", holdScore);
