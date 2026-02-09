[...document.getElementsByClassName("card")].forEach((card) => {
    // 마우스 호버 시 하이라이트
    card.addEventListener("mouseenter", (e) => {
        (e.currentTarget as Element).classList.add("hover");
    })

    // 마우스 호버 종료 시 하이라이트 제거
    card.addEventListener("mouseleave", (e) => {
        (e.currentTarget as Element).classList.remove("hover");
    })

    // 클릭 시 하이라이트 토글 및 정답 검사
    card.addEventListener("click", (e) => {
        (e.currentTarget as Element).classList.toggle("selected");
        evaluateAnswer();
    })
});

document.getElementsByClassName("gyeol")[0].addEventListener("click", (e) => {
    evaluateGyeol();
})