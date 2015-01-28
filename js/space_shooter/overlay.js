/**
 * Defines the overlay that displays the number of player lives and the player's score
 */
var SPACESHOOTER = (function (game) {
    var overlay = {};
    overlay.head = {};
    overlay.head.image = new Image();
    overlay.head.loaded = false;
    overlay.head.image.onload = function () {
        overlay.head.loaded = true;
    };
    overlay.head.image.src = "/images/space_shooter/overlay.png";

    overlay.draw = function() {
        if(overlay.head.loaded) {
            game.ctx.drawImage(overlay.head.image, 0, 0);
        }
        if(game.hero.loaded) {
            for( var i = 1; i <= game.hero.remainingLives ; i++ ) {
                game.ctx.drawImage(game.hero.heroImage, game.canvas.width - 35*i, 3);
            }
        }
        game.ctx.fillStyle = "rgb(250, 250, 250)";
        game.ctx.font = "14px Futura";
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        var score = "Score: " + (1e12 + game.score + "").slice(1);
        game.ctx.fillText(score, 10, 5);
    };
    overlay.reset = function() {
        if(game.highScore < game.score) {
            game.highScore = game.score;
        }
        game.score = 0;
    }
    game.overlay = overlay;
    return game;
}(SPACESHOOTER));