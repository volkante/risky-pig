"use Strict";
/* 
    <h1 class="game-title">Risky Pig</h1>
    <button class="start-button">NEW GAME</button>
    <h3 class="player-name">PLAYER 1</h3>
    <p class="first-player-total-score">Total score: X</p>
    <p class="first-player-current-score">Current score: X</p>
    <h3 class="player-name">PLAYER 2</h3>
    <p class="second-player-total-score">Total score: X</p>
    <p class="second-player-total-score">Current score: X</p>
    <button class="dice-button">ROLL</button>
    <button class="hold-button">HOLD</button>
*/

// Select elements
const startButton = document.querySelector(".start-button");
const firstPlayerTotalScore = document.querySelector(
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
