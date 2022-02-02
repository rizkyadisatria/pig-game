'use strict';

//select element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer;

//start condition
const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document.querySelector('.btn--roll').disabled = false;
  document.querySelector('.btn--hold').disabled = false;
};

reset();

//switchplayer
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  //generate random dice
  const dice = Math.trunc(Math.random() * 6) + 1;
  //display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //dice condition
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //add score to the global
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  //win game
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    diceEl.classList.add('hidden');

    document.querySelector('.btn--roll').disabled = true;
    document.querySelector('.btn--hold').disabled = true;
  } else {
    //switch player
    switchPlayer;
  }
});

//reset game
document.querySelector('.btn--new').addEventListener('click', reset);
