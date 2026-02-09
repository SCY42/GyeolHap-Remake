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


// function convertElemToCard(...elems) {
//     let result = []
//     elems.map(elem => {
//         const bgClassList = [...elem.classList];
//         const cardClassList = [...elem.getElementsByClassName("shape")[0].classList]

//         const color = cardClassList.find(c => 
//             c === "red" || c === "blue" || c === "green"
//         );
//         const shape = cardClassList.find(c =>
//             c === "circle" || c === "square" || c === "triangle"
//         );
//         const bgColor = bgClassList.find(c =>
//             c === "black" || c === "gray" || c === "white"
//         );
//         result.push([color, shape, bgColor]);
//     }); return result;
// }


// // 세 카드가 정답인지 검사하는 함수
// function isAnswer(card1, card2, card3) {
//     let check;
//     if ((card1 instanceof Element)) { [card1, card2, card3] = convertElemToCard(card1, card2, card3); }
//     if (isDuplicate(card1, card2, card3)) return false;
//     for (let i = 0; i < 3; i++) {
//         check = ((card1[i] == card2[i]) && (card2[i] == card3[i]) && (card3[i] == card1[i])) ||
//                 ((card1[i] != card2[i]) && (card2[i] != card3[i]) && (card3[i] != card1[i]))
//         if (!check) { return false; }
//     } return true;
// }


// // 정답이 이미 나왔던 것인지 검사하는 함수
// function isDuplicate(card1, card2, card3) {
//     const answersString = answersToAnswersString(card1, card2, card3);
//     const answers = document.getElementsByClassName("answers-row")[0].childNodes
//     answers.forEach(answer => {
//         if (answer.textContent == answersString) return true;
//     }); return false;
// }


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
    if (result) { addToAnswersRow(cardsToNumbersString(...answers)); }
    showResult(result);
    removeSelection();
}


// // 세 개의 카드를 숫자 문자열로 변환하는 함수
// function answersToAnswersString(...answers) {
//     const answersString = [];
//     [...answers].forEach((answer) => {
//         answersString.push(answer.getElementsByClassName("number")[0].textContent);
//     });
//     return answersString.join(" ");
// }


// 정답 행에 요소를 추가하는 함수
function addToAnswersRow(answerString: string) {
    const answersRow = document.getElementsByClassName("answers-row")[0];
    let answer = document.createElement("div");
    answer.classList.add("answer");
    answer.textContent = answerString;
    answersRow.appendChild(answer);
}


// 정답 여부를 보여주는 함수
function showResult(isAnswer: boolean) {
    alert(isAnswer);
}