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
                    answers.push([i, j, k].join(" "));
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
    const existingAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent);
    console.log(existingAnswers);
    return existingAnswers.includes(answersString);
}
function evaluateGyeol() {
    console.log(ANSWERS);
    const currentAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent).sort();
    const isGyeol = ANSWERS.join("") === currentAnswers.join("");
    if (isGyeol) {
        alert("결!");
        gameOver();
    }
    ;
}
function gameOver() {
    const giveupButton = document.getElementsByClassName("giveup")[0];
    giveupButton.textContent = "재시작";
}
