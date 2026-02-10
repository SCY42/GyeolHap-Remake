function generateDeck() {
    let deck = [];
    Object.values(Color).forEach((c) => {
        Object.values(Shape).forEach((s) => {
            Object.values(BgColor).forEach((bg) => {
                deck.push(new Card(c, s, bg));
            });
        });
    });
    return deck;
}
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function pickCards(deck) {
    let cards = [];
    for (let i = 0; i < 9; i++) {
        let pick = getRandomInt(0, deck.length);
        let card = deck[pick];
        card.setIndex(i);
        cards.push(card);
        deck.splice(pick, 1);
    }
    return cards;
}
function findAnswers(cards) {
    let answers = [];
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            for (let k = j + 1; k < 9; k++) {
                if (isAnswer(cards[i], cards[j], cards[k])) {
                    answers.push([i + 1, j + 1, k + 1].join(" "));
                }
            }
        }
    }
    return answers;
}
function initializeGame(cards) {
    let cardSlots = document.getElementsByClassName("card");
    let shapeSlots = document.getElementsByClassName("shape");
    let answerRow = document.getElementsByClassName("answers-row")[0];
    answerRow.replaceChildren();
    for (let i = 0; i < 9; i++) {
        shapeSlots[i].className = "shape";
        cardSlots[i].className = "card";
    }
    let answers = findAnswers(cards);
    for (let i = 0; i < 9; i++) {
        shapeSlots[i].classList.add(cards[i].color);
        shapeSlots[i].classList.add(cards[i].shape);
        cardSlots[i].classList.add(cards[i].bgColor);
    }
    return answers;
}
function removeSelection() {
    const cards = document.getElementsByClassName("card");
    [...cards].forEach((card) => {
        card.classList.remove("hover");
        card.classList.remove("selected");
    });
}
function evaluateAnswer() {
    const answers = selectionToCards();
    if (answers.length != 3) {
        return;
    }
    const result = isAnswer(answers[0], answers[1], answers[2]);
    if (result) {
        const answersString = cardsToNumbersString(...answers);
        for (let i = 0; i < ANSWERS_REMANING.length; i++) {
            if (ANSWERS_REMANING[i] == answersString) {
                ANSWERS_REMANING.splice(i, 1);
                break;
            }
        }
        if (!isDuplicate(answersString)) {
            addToAnswersRow(answersString);
        }
    }
    showResult(result);
    removeSelection();
}
function addToAnswersRow(answerString) {
    const answersRow = document.getElementsByClassName("answers-row")[0];
    let answer = document.createElement("div");
    answer.classList.add("answer");
    answer.textContent = answerString;
    answersRow.appendChild(answer);
}
function showResult(isAnswer) {
    alert(isAnswer);
}
function isDuplicate(answersString) {
    const currentAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent);
    return currentAnswers.includes(answersString);
}
function evaluateGyeol() {
    const isGyeol = ANSWERS_REMANING.length == 0;
    if (isGyeol) {
        alert("결!");
        gameOver();
    }
    else {
        alert("결 아님!");
    }
}
function gameOver() {
    GIVEUP_BUTTON.textContent = "재시작";
    GYEOL_BUTTON.classList.add("noclick");
    BOARD.classList.add("noclick");
    isGameOver = true;
}
function gameRestart() {
    CARDS = pickCards(generateDeck());
    ANSWERS_REMANING = initializeGame(CARDS);
    isGameOver = false;
    GIVEUP_BUTTON.textContent = "포기";
    GYEOL_BUTTON.classList.remove("noclick");
    BOARD.classList.remove("noclick");
}
function revealAnswers() {
    ANSWERS_REMANING.forEach(answer => {
        addToAnswersRow(answer);
    });
}
