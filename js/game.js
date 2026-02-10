var CenterText;
(function (CenterText) {
    CenterText["GYEOL"] = "text-gyeol";
    CenterText["HAP"] = "text-hap";
    CenterText["WRONG"] = "text-wrong";
    CenterText["DUPLICATE"] = "text-duplicate";
    CenterText["GIVE_UP"] = "text-giveup";
    CenterText["RESTART"] = "text-restart";
})(CenterText || (CenterText = {}));
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
            animateText(CenterText.HAP);
        }
        else {
            animateText(CenterText.DUPLICATE);
        }
    }
    else {
        animateText(CenterText.WRONG);
    }
    removeSelection();
}
function addToAnswersRow(answerString) {
    const answersRow = document.getElementsByClassName("answers-row")[0];
    let answer = document.createElement("div");
    answer.classList.add("answer");
    answer.textContent = answerString;
    answersRow.appendChild(answer);
}
function isDuplicate(answersString) {
    const currentAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent);
    return currentAnswers.includes(answersString);
}
function evaluateGyeol() {
    const isGyeol = ANSWERS_REMANING.length == 0;
    if (isGyeol) {
        animateText(CenterText.GYEOL);
        gameOver();
    }
    else {
        animateText(CenterText.WRONG);
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
    animateText(CenterText.RESTART);
}
function revealAnswers() {
    ANSWERS_REMANING.forEach(answer => {
        addToAnswersRow(answer);
    });
}
function animateText(textEnum) {
    const text = document.getElementById(textEnum);
    if (!(text == null)) {
        text.classList.remove("hidden");
        text.classList.add("text-appear");
    }
}
