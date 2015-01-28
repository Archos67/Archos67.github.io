/**
 * Defines the main menu of the game
 */
var SPACESHOOTER = (function (game) {
    game.menu = {};
    game.mainmenu = {};
    game.mainmenu.selection = 0;
    game.mainmenu.reset = function() {
        game.mainmenu.selection = 0;
    };
    game.mainmenu.update = function(modifier) {
        if (74 in game.keysDown) {
            game.playing = true;
            game.song.pause();
            game.song = game.music.action();

            game.song.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);

            game.song.play();
        }
    };
    game.mainmenu.draw = function() {
        if(game.overlay.head.loaded) {
            game.ctx.drawImage(game.overlay.head.image, 0, 0);
        }
        game.ctx.fillStyle = "rgb(250, 250, 250)";
        game.ctx.font = "18px Futura";
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        var score = "High Score: " + (1e12 + game.highScore + "").slice(1);
        game.ctx.fillText(score, 200, 5);

        if(game.mainmenu.selection === 0) {
            game.ctx.fillStyle = "rgb(250, 250, 250)";
        } else {
            game.ctx.fillStyle = "rgb(250, 250, 250)";
        }
        var title = "Space Shooter";
        game.ctx.font = "64px Futura"
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        game.ctx.fillText(title, 100, 150);

        var start = "Press J to Play";
        game.ctx.font = "48px Futura"
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        game.ctx.fillText(start, 150, 250);

        var shoot = "Hold J to shoot"
        game.ctx.font = "32px Futura"
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        game.ctx.fillText(shoot, 200, 400);

        var wasd = "WASD to move"
        game.ctx.font = "32px Futura"
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        game.ctx.fillText(wasd, 200, 350);

        var precise = "Shift key to slow"
        game.ctx.font = "32px Futura"
        game.ctx.textAlign = "left";
        game.ctx.textBaseline = "top";
        game.ctx.fillText(precise, 200, 450);
        //game.ctx.drawImage(game.mainmenu.image, 100, 100);
    };

    return game;
 }(SPACESHOOTER));