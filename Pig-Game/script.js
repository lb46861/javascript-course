'use strict';

//selecting elements in case we need to use them multipe times
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
//getElementById is little bit faster the querySelector
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
//Impementning the Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true, switch to next player, if not add dice to current score
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});
