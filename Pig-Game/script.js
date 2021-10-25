'use strict';

//selecting elements in case we need to use them multipe times
const score0El = document.querySelector('#score--0');
//getElementById is little bit faster the querySelector
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
