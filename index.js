$(document).ready(function() {
    console.log("hello world")
    $(".card").click(function() {
        $(this).toggleClass("flipped");
    });
});