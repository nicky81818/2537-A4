$(document).ready(function() {
    let firstCard = undefined;
    let secondCard = undefined;

    // console.log("hello world")
    $(".card").click(function() {
        $(this).toggleClass("flipped");
        if (!firstCard) {
            firstCard = {};
            firstCard.img = $(this).find(".front_face img")[0];
            firstCard.cardID = $(this).attr("id");
        }
        else {
            secondCard = {};
            secondCard.img = $(this).find(".front_face img")[0];
            secondCard.cardID = $(this).attr("id");
            if(firstCard.img.src === secondCard.img.src) {
                console.log("match");
                $(`#${firstCard.cardID}`).off("click");
                $(`#${secondCard.cardID}`).off("click");
                firstCard = undefined;
                secondCard = undefined;
            }
            else {
                console.log("no match");
                setTimeout(function() {
                    $(`#${firstCard.cardID}`).toggleClass("flipped");
                    $(`#${secondCard.cardID}`).toggleClass("flipped");
                    firstCard = undefined;
                    secondCard = undefined;
                }, 1000);
            }
        }
    });
});