/**
 * Foreground and background definitions included here in the bg sub module. Uses two image for parallax.
 */
var SPACESHOOTER = (function (game) {
    var bg = {};
    bg.bg = {};
    bg.bg.image = new Image();
    bg.bg.loaded = false;
    bg.bg.image.onload = function () {
        bg.bg.loaded = true;
    };
    bg.bg.image.src = "/images/space_shooter/bg.png";
    bg.bg.y = 30;
    bg.bg.speed = 10;

    bg.fg = {};
    bg.fg.image = new Image();
    bg.fg.loaded = false;
    bg.fg.image.onload = function () {
        bg.fg.loaded = true;
    };
    bg.fg.image.src = "/images/space_shooter/fg.png";
    bg.fg.y = 30;
    bg.fg.speed = 15;
    bg.update = function(modifier) {
        //parallax done here
        bg.bg.y = bg.bg.y + bg.bg.speed * modifier;
        bg.fg.y = bg.fg.y + bg.fg.speed * modifier;

        if(bg.bg.y > 30)  {
            bg.bg.y = 30 - bg.bg.image.height / 2;
        }
        if(bg.fg.y > 30)  {
            bg.fg.y = 30 - bg.fg.image.height / 2;
        }
    };
    bg.draw = function() {
        if(bg.bg.loaded) {
            game.ctx.drawImage(bg.bg.image, 0, bg.bg.y);
        }
        if(bg.fg.loaded) {
            game.ctx.drawImage(bg.fg.image, 0, bg.fg.y)
        }
    };
    bg.reset = function() {
        bg.fg.y = 30;
        bg.bg.y = 30;
    };
    game.bg = bg;
    return game;
}(SPACESHOOTER));
