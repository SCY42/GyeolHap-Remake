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
                    answers.push([i, j, k].join(" "));
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
    const existingAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent);
    console.log(existingAnswers);
    return existingAnswers.includes(answersString);
}


// 결 여부를 체크하는 함수
function evaluateGyeol() {
    console.log(ANSWERS);
    const currentAnswers = [...document.getElementsByClassName("answer")].map(answer => answer.textContent).sort();
    const isGyeol = ANSWERS.join("") === currentAnswers.join("");

    if (isGyeol) { 
        alert("결!");   // TODO 결 이쁘게 보여주기
        gameOver();
     };
}


// 게임 종료 함수
function gameOver() {
    const giveupButton = document.getElementsByClassName("giveup")[0];
    giveupButton.textContent = "재시작";
}