[...document.getElementsByClassName("card")].forEach((card) => {
    card.addEventListener("mouseenter", (e) => {
        e.currentTarget.classList.add("hover");
    });
    card.addEventListener("mouseleave", (e) => {
        e.currentTarget.classList.remove("hover");
    });
    card.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("selected");
        evaluateAnswer();
    });
});
document.getElementsByClassName("gyeol")[0].addEventListener("click", (e) => {
    evaluateGyeol();
});
