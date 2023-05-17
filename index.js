const EASY = 6/2
const MEDIUM = 12/2
const HARD = 24/2
let mode = 'easy'
let time = 100 * 1000; // 100 seconds


function getPokemon(gamemode) {
    let pokemonURLS = []
    let randomNums = randomList(gamemode)
    // console.log(randomNums)
    for (let i=0; i < gamemode; i++) {
        console.log(randomNums[i])
        pokemonURLS.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNums[i]}.png`)
    }
    return pokemonURLS
}


function populateGameBoard(gamemode) {
    $('#game_grid').removeClass();
    if (gamemode === 'easy') {
        size = EASY;
        time = 100 * 1000;
    } else if (gamemode === 'medium') {
        size = MEDIUM;
        $('#game_grid').addClass("medium");
        time = 200 * 1000;
    } else {
        size = HARD;
        $('#game_grid').addClass("hard");
        time = 300 * 1000;
    }
    let pokemons = getPokemon(size)
    pokemons = shuffleArray(pokemons.concat(pokemons))
    let i = 1
    pokemons.forEach(pokemon => {
        $("#game_grid").append(`
        <div class="card" id="card${i}"}>
            <div class="front_face">
                <img src="${pokemon}" alt="pokemon">
            </div>
            <div class="back_face">
                <img src="pokeball.png" alt="pokeball">
            </div>
        </div>`)
        i++;
    })
}

function randomList(size) {
    let randoList = new Set()
    for (let i = 0; i < size; i++) {
        randoList.add(parseInt(Math.floor(Math.random() * 500)) + 1)
    }
    return Array.from(randoList)
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function changeActive() {
    $("button.mode").click(function() {
        $("button.mode").removeClass("active");
        $(this).addClass("active");
        mode = $(this).attr("id")
    })
}

$(document).ready(function() {
    $("#timeResults").hide()
    changeActive()
    $("button#resetBtn").click(function() {
        console.log("reset");
        clearInterval(timer);
        location.reload();
    });

    $("button#startBtn").click(function() {
        console.log("start");
        $("#header").after(`<div id="game_grid"></div>`)
        populateGameBoard(mode)
        $("button#startBtn").hide();
        $("#timeResults").show()
        $("#totalTime").text(time / 1000);
        $("#timer").text(time / 1000);
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

});