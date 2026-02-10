enum CenterText {
    GYEOL = "text-gyeol",
    HAP = "text-hap",
    WRONG = "text-wrong",
    DUPLICATE = "text-duplicate",
    GIVE_UP = "text-giveup",
    RESTART = "text-restart"
}


// 게임 초기화 함수
function initializeGame(cards: Card[]) {
    let cardSlots = document.getElementsByClassName("card");
    let shapeSlots = document.getElementsByClassName("shape");
    let answerRow = document.getElementsByClassName("answers-row")[0];

    // 정답 줄 초기화
    answerRow.replaceChildren();

    // 판 초기화
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


// 호버 및 선택 효과 제거 함수
function removeSelection() {
    const cards = document.getElementsByClassName("card");
    [...cards].forEach((card) => {
        card.classList.remove("hover");
        card.classList.remove("selected");
    });
}


// 플레이어의 답안을 검사하는 함수
function evaluateAnswer() {
    const answers = selectionToCards();
    if (answers.length != 3) { return; }

    const result = isAnswer(answers[0], answers[1], answers[2]);
    if (result) {   // 합
        const answersString = cardsToNumbersString(...answers);
        for (let i = 0; i < ANSWERS_REMANING.length; i++) {
            if (ANSWERS_REMANING[i] == answersString) { ANSWERS_REMANING.splice(i, 1); break; }
        }
        if (!isDuplicate(answersString)) {  // 올바른 답안
            addToAnswersRow(answersString);
            animateText(CenterText.HAP);
        } else {                            // 중복 답안
            animateText(CenterText.DUPLICATE);
        }
    } else { animateText(CenterText.WRONG); }
    removeSelection();
}


// 정답 행에 요소를 추가하는 함수
function addToAnswersRow(answerString: string) {
    const answersRow = document.getElementsByClassName("answers-row")[0];
    let answer = document.createElement("div");
    answer.classList.add("answer");
    answer.textContent = answerString;
    answersRow.appendChild(answer);
}


// 중복 정답을 체크하는 함수
function isDuplicate(answersString: string) {
    const currentAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent);
    return currentAnswers.includes(answersString);
}


// 결 여부를 체크하는 함수
function evaluateGyeol() {
    const isGyeol = ANSWERS_REMANING.length == 0;

    if (isGyeol) { 
        animateText(CenterText.GYEOL);
        gameOver();
    } else { animateText(CenterText.WRONG); }
}


// 게임 종료 함수
function gameOver() {
    GIVEUP_BUTTON.textContent = "재시작";
    GYEOL_BUTTON.classList.add("noclick");
    BOARD.classList.add("noclick");
    isGameOver = true;
}


// 게임 재시작 함수
function gameRestart() {
    CARDS = pickCards(generateDeck());
    ANSWERS_REMANING = initializeGame(CARDS);

    isGameOver = false;

    GIVEUP_BUTTON.textContent = "포기";
    GYEOL_BUTTON.classList.remove("noclick");
    BOARD.classList.remove("noclick");

    animateText(CenterText.RESTART);
}


// 모든 정답을 보여주는 함수
function revealAnswers() {
    ANSWERS_REMANING.forEach(answer => {
        addToAnswersRow(answer);
    });
}


// 텍스트 애니메이션을 재생하는 함수
function animateText(textEnum: CenterText) {
    const text = document.getElementById(textEnum);
    if (!(text == null)) {
        text.classList.remove("hidden");
        text.classList.add("text-appear");
    }
}