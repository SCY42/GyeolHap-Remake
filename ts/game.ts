// 가능한 모든 카드를 생성하는 함수
function generateDeck() {
    let deck: Card[] = [];
    Object.values(Color).forEach((c) => {
        Object.values(Shape).forEach((s) => {
            Object.values(BgColor).forEach((bg) => {
                deck.push(new Card(c, s, bg));
            })
        })
    })
    return deck;
}


// 랜덤 정수 생성 함수 (출처 MDN)
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 최댓값은 제외, 최솟값은 포함
}


// 덱에서 카드 9장을 뽑는 함수
function pickCards(deck: Card[]) {
    let cards = []
    for (let i = 0; i < 9; i++) {
        let pick = getRandomInt(0, deck.length);
        let card = deck[pick];
        card.setIndex(i);
        cards.push(card);
        deck.splice(pick, 1);
    }
    return cards;
}


// 9장의 카드로 가능한 모든 정답을 찾는 함수
function findAnswers(cards: Card[]) {
    let answers: Array<string> = []
    for (let i = 0; i < 9; i++) {
        for (let j = i+1; j < 9; j++) {
            for (let k = j+1; k < 9; k++) {
                if (isAnswer(cards[i], cards[j], cards[k])) { 
                    answers.push([i+1, j+1, k+1].join(" "));
                }
            }
        }
    }
    return answers;
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
    if (result) { 
        const answersString = cardsToNumbersString(...answers);
        for (let i = 0; i < ANSWERS_REMANING.length; i++) {
            if (ANSWERS_REMANING[i] == answersString) { ANSWERS_REMANING.splice(i, 1); break; }
        }
        if (!isDuplicate(answersString)) { addToAnswersRow(answersString); }
    }
    showResult(result);
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


// 정답 여부를 보여주는 함수
// TODO Alert 대신 더 이쁘게, 자동으로 사라지도록 만들기
function showResult(isAnswer: boolean) {
    alert(isAnswer);
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
        alert("결!");   // TODO 결 이쁘게 보여주기
        gameOver();
    } else { alert("결 아님!"); }
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
}


// 모든 정답을 보여주는 함수
function revealAnswers() {
    ANSWERS_REMANING.forEach(answer => {
        addToAnswersRow(answer);
    });
}