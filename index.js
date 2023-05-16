$(document).ready(function() {
    let firstCard = undefined;
    let secondCard = undefined;
    let cards = $(".card");    
    let flippedCards = 0;
    let clicks = 0;

    $("#totalPairs").text(cards.length / 2)

    $(".card").click(function() {
        if (firstCard && secondCard) {
            return;
        }
        if (!$(this).hasClass("flipped")) {
            $(this).toggleClass("flipped");
        }
        if (!firstCard) {
            firstCard = {};
            firstCard.img = $(this).find(".front_face img")[0];
            firstCard.cardID = $(this).attr("id");
            clicks++;
            $("#numClicks").text(clicks);
        }
        else {
            secondCard = {};
            secondCard.img = $(this).find(".front_face img")[0];
            secondCard.cardID = $(this).attr("id");
            if (firstCard.cardID === secondCard.cardID) {
                secondCard = undefined;
                return;
            }
            if(firstCard.img.src === secondCard.img.src) {
                console.log("match");
                $(`#${firstCard.cardID}`).off("click");
                $(`#${secondCard.cardID}`).off("click");
                firstCard = undefined;
                secondCard = undefined;
                flippedCards += 2;
                $("#numPairs").text(flippedCards / 2)
                if (flippedCards === cards.length) {
                    setTimeout(function() {
                        alert("You win!");
                    }, 1000);    
                }

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
            clicks++;
            $("#numClicks").text(clicks);
        }
    });
});