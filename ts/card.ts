enum Color {
    RED = "red",
    GREEN = "green",
    BLUE = "blue"
}

enum Shape {
    SQUARE = "square",
    TRIANGLE = "triangle",
    CIRCLE = "circle"
}

enum BgColor {
    BLACK = "black",
    GRAY = "gray",
    WHITE = "white"
}


class Card {
    color: Color;
    shape: Shape;
    bgColor: BgColor;
    index: number;
    
    constructor(color: Color, shape: Shape, bgColor: BgColor) {
        this.color = color;
        this.shape = shape;
        this.bgColor = bgColor;
        this.index = -1;
    }

    setIndex(index: number) {
        this.index = index;
    }
}


function isAnswer(c1: Card, c2: Card, c3: Card) {
    let color, shape, bgColor;
    
    color = (c1.color == c2.color && c2.color == c3.color) ||
    (c1.color != c2.color && c2.color != c3.color && c3.color != c1.color);
    shape = (c1.shape == c2.shape && c2.shape == c3.shape) ||
    (c1.shape != c2.shape && c2.shape != c3.shape && c3.shape != c1.shape);
    bgColor = (c1.bgColor == c2.bgColor && c2.bgColor == c3.bgColor) ||
    (c1.bgColor != c2.bgColor && c2.bgColor != c3.bgColor && c3.bgColor != c1.bgColor);
    
    return color && shape && bgColor;
}


function cardsToNumbersString(...cards: Card[]) {
    return cards.map(card => (card.index + 1).toString()).join(" ");
}


function selectionToCards() {
    const result: Card[] = [];
    const selections = document.getElementsByClassName("selected");
    [...selections].forEach(selection => {
        const index = +selection.getElementsByClassName("number")[0].textContent - 1;
        result.push(CARDS[index]);
    }); return result;
}


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