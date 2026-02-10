const BOARD = document.getElementsByClassName("board")[0];
const GYEOL_BUTTON = document.getElementsByClassName("gyeol")[0];
const GIVEUP_BUTTON = document.getElementsByClassName("giveup")[0];
let CARDS = pickCards(generateDeck());
let ANSWERS_REMANING = initializeGame(CARDS);
let isGameOver = false;
