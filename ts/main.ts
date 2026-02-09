const BOARD = document.getElementsByClassName("board")[0];
const CARDS = pickCards(generateDeck());
const ANSWERS = initializeGame(CARDS);