// element variable (el = element)
const point0 = document.querySelector(".point--0");
const point1 = document.querySelector(".point--1");
const tempPoint0 = document.querySelector(".score--0");
const tempPoint1 = document.querySelector(".score--1");
const rollEl = document.querySelectorAll(".roll");
const holdEl = document.querySelectorAll(".hold");
const diceEl = document.querySelector(".dice");
const btn1El = document.querySelector(".btn1");
const btn2El = document.querySelector(".btn2");
const player1El = document.getElementById("player--0");
const player2El = document.getElementById("player--1");
const restart = document.querySelector(".restart");
const popup = document.querySelector(".win-popup");
const overlay = document.querySelector(".overlay");
const playAgain = document.querySelector(".play-again");

// player active
let active = 0;
// final point
let point = [0, 0];
// temporary point
let tempPoint = 0;

const changePlayer = function () {
  active = active === 0 ? (active = 1) : (active = 0);
  btn1El.classList.toggle("hidden");
  btn2El.classList.toggle("hidden");
  player1El.classList.toggle("player-active");
  player2El.classList.toggle("player-active");
  tempPoint0.textContent = 0;
  tempPoint1.textContent = 0;
  tempPoint = 0;
};

// start state
const startState = function () {
  point0.textContent = 0;
  point1.textContent = 0;
  tempPoint0.textContent = 0;
  tempPoint1.textContent = 0;
  point = [0, 0];
  active = 0;
  tempPoint = 0;
  diceEl.classList.add("hidden");
  btn1El.classList.remove("hidden");
  btn2El.classList.add("hidden");
  player1El.classList.add("player-active");
  player2El.classList.remove("player-active");
};

// roll button
for (let i = 0; i < rollEl.length; i++)
  rollEl[i].addEventListener("click", function () {
    let random = Math.trunc(Math.random() * 6 + 1);
    if (random !== 1) {
      tempPoint += random;
      document.querySelector(`.score--${active}`).textContent = tempPoint;
      diceEl.classList.remove("hidden");
      diceEl.src = `./assets/dice-${random}.png`;
    } else if (random === 1) {
      changePlayer();
    }
  });

// hold button
for (let i = 0; i < holdEl.length; i++)
  holdEl[i].addEventListener("click", function () {
    if (point[active] + tempPoint >= 100) {
      popup.classList.remove("hidden");
      overlay.classList.remove("hidden");
      document.querySelector(".player-win").textContent = `PLAYER ${
        active + 1
      } WIN`;
    } else {
      point[active] += tempPoint;
      document.querySelector(`.point--${active}`).textContent = point[active];
      changePlayer();
    }
  });

restart.addEventListener("click", function () {
  startState();
});

playAgain.addEventListener("click", function () {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
  startState();
});
