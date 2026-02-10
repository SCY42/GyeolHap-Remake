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