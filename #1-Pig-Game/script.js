'use strict';

const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");

const player0 = {
	totalScore: 0,
	currentScoreEl: document.getElementById("current--0"),
	scoreEl: document.getElementById("score--0"),
	playerSection: document.querySelector(".player--0")
};

const player1 = {
	totalScore: 0,
	currentScoreEl: document.getElementById("current--1"),
	scoreEl: document.getElementById("score--1"),
	playerSection: document.querySelector(".player--1")
};

const switchPlayers = function (player) {
	currentPlayer.currentScoreEl.textContent = 0;
	currentScore = 0;
	currentPlayer.playerSection.classList.toggle("player--active");
	currentPlayer = player;
	currentPlayer.playerSection.classList.toggle("player--active");
};

const newGame = function () {
	switchPlayers(player0);

	player0.scoreEl.textContent = 0;
	player1.scoreEl.textContent = 0;

	player0.currentScoreEl.textContent = 0;
	player1.currentScoreEl.textContent = 0;

	player0.totalScore = 0
	player1.totalScore = 0

	diceRoll = 0;
	currentScore = 0;
	playing = true;

	dice.classList.add("hidden");
	player0.playerSection.classList.remove("player--winner");
	player1.playerSection.classList.remove("player--winner");
};

//initialization
let playing = true;
let currentPlayer = player0;
let diceRoll = 0;
let currentScore = 0;
newGame();

//roll button
rollButton.addEventListener("click", function () {
	if (!playing) {return;}

	diceRoll = Math.trunc(Math.random() * 6 + 1);
	
	dice.classList.remove("hidden");
	dice.src = `dice-${diceRoll}.png`;
	if (diceRoll !== 1) {
		currentScore += diceRoll;
		currentPlayer.currentScoreEl.textContent = currentScore;
	} else {
		//switch players
		if (currentPlayer === player0) {
			switchPlayers(player1);
		} else {
			switchPlayers(player0);
		}
	}
});

holdButton.addEventListener("click", function () {
	if (!playing) {return;}

	currentPlayer.totalScore += currentScore;
	currentPlayer.scoreEl.textContent = currentPlayer.totalScore;
	
	if (currentPlayer.totalScore >= 100) {
		currentPlayer.playerSection.classList.add("player--winner");
		playing = false;
		dice.classList.add("hidden");
	} else {
		if (currentPlayer === player0) {
			switchPlayers(player1);
		} else {
			switchPlayers(player0);
		}
	}
});

newGameButton.addEventListener("click", newGame);
