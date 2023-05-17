$(document).ready(function() {
    let firstCard = undefined;
    let secondCard = undefined;
    let cards = $(".card");    
    let flippedCards = 0;
    let clicks = 0;
    $("#totalPairs").text(cards.length / 2)

    let time = 100 * 1000; // 100 seconds
    $("#totalTime").text(time / 1000);
    $("#timer").text(time / 1000);
    let timer = setInterval(function() {
        time -= 1000;
        $("#timer").text(time / 1000);
        if (time === 0) {
            clearInterval(timer);
            console.log("time is up");
            $("#game_grid").empty()
            $("#game_grid").append(`<h1>Game Over!
                <button onclick="location.reload()">Play Again</button>
            </h1>`);
        }
    }, 1000);

    $("button#resetBtn").click(function() {
        console.log("reset");
        clearInterval(timer);
        $("#game_grid").remove()
        $("button#startBtn").show();
    });

    $("button#startBtn").click(function() {
        console.log("start");
        $("#header").after(`<div id="game_grid"></div>`);
        // $("#game_grid").append(cards);
        $("button#startBtn").hide();
        time = 100 * 1000; // 100 seconds
        timer = setInterval(function() {
            $("#timer").text(time / 1000);
            time -= 1000;
            if (time === 0) {
                clearInterval(timer);
                console.log("time is up");
                $("#game_grid").empty()
                $("#game_grid").append(`<h1>Game Over!
                    <button onclick="location.reload()">Play Again</button>
                </h1>`);
            }
        }, 1000);;
    });
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
                        clearInterval(timer);
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