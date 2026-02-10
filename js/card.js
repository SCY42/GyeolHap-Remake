var Color;
(function (Color) {
    Color["RED"] = "red";
    Color["GREEN"] = "green";
    Color["BLUE"] = "blue";
})(Color || (Color = {}));
var Shape;
(function (Shape) {
    Shape["SQUARE"] = "square";
    Shape["TRIANGLE"] = "triangle";
    Shape["CIRCLE"] = "circle";
})(Shape || (Shape = {}));
var BgColor;
(function (BgColor) {
    BgColor["BLACK"] = "black";
    BgColor["GRAY"] = "gray";
    BgColor["WHITE"] = "white";
})(BgColor || (BgColor = {}));
class Card {
    constructor(color, shape, bgColor) {
        this.color = color;
        this.shape = shape;
        this.bgColor = bgColor;
        this.index = -1;
    }
    setIndex(index) {
        this.index = index;
    }
}
function isAnswer(c1, c2, c3) {
    let color, shape, bgColor;
    color = (c1.color == c2.color && c2.color == c3.color) ||
        (c1.color != c2.color && c2.color != c3.color && c3.color != c1.color);
    shape = (c1.shape == c2.shape && c2.shape == c3.shape) ||
        (c1.shape != c2.shape && c2.shape != c3.shape && c3.shape != c1.shape);
    bgColor = (c1.bgColor == c2.bgColor && c2.bgColor == c3.bgColor) ||
        (c1.bgColor != c2.bgColor && c2.bgColor != c3.bgColor && c3.bgColor != c1.bgColor);
    return color && shape && bgColor;
}
function cardsToNumbersString(...cards) {
    return cards.map(card => (card.index + 1).toString()).join(" ");
}
function selectionToCards() {
    const result = [];
    const selections = document.getElementsByClassName("selected");
    [...selections].forEach(selection => {
        const index = +selection.getElementsByClassName("number")[0].textContent - 1;
        result.push(CARDS[index]);
    });
    return result;
}
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
