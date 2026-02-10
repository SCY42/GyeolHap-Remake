[...document.getElementsByClassName("card")].forEach((card) => {
    card.addEventListener("mouseenter", e => {
        e.currentTarget.classList.add("hover");
    });
    card.addEventListener("mouseleave", e => {
        e.currentTarget.classList.remove("hover");
    });
    card.addEventListener("click", e => {
        e.currentTarget.classList.toggle("selected");
        evaluateAnswer();
    });
});
document.getElementsByClassName("gyeol")[0].addEventListener("click", e => {
    evaluateGyeol();
});
document.getElementsByClassName("giveup")[0].addEventListener("click", e => {
    if (!isGameOver) {
        animateText(CenterText.GIVE_UP);
        revealAnswers();
        gameOver();
    }
    else {
        animateText(CenterText.RESTART);
        gameRestart();
    }
});
[...document.getElementsByClassName("text")].forEach(text => {
    text.addEventListener("animationend", e => {
        e.target.classList.add("hidden");
    });
});
