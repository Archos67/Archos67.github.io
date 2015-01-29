/**
 * Defines the bullets sub module, which includes a basic outline for a bullet (death, images, resetting)
 */
var SPACESHOOTER = (function(game) {
    game.bullets = {};
    game.enemyBullets = [];
    game.playerBullets = [];

    game.bullets.inBounds = function(bullet) {
        return bullet.x > 0 - bullet.image.width
            && bullet.x < game.canvas.width
            && bullet.y > 30 - bullet.image.height
            && bullet.y < game.canvas.height;
    };
    game.numberOfEnemyBullets = 0;
    game.addEnemyBullet = function(bullet) {
       /* var sound = game.sfx.enemyLaser();
        sound.volume = .05;
        sound.play();*/
        game.enemyBullets[game.numberOfEnemyBullets] = bullet;
        game.numberOfEnemyBullets++;
    };

    game.bullets.reset = function() {
        game.numberOfEnemyBullets = 0;
        game.enemyBullets = [];
    };

    game.bullets.redDeath = [];
    game.bullets.blueDeath = [];
    game.bullets.greenDeath = [];
    game.bullets.yellowDeath = [];

    for(var i = 1; i < 6; i++) {
        game.bullets.blueDeath[i-1] = new Image();
        game.bullets.blueDeath[i-1].src = "/images/space_shooter/bullets/blue_hit_" + i + ".png";

        game.bullets.redDeath[i-1] = new Image();
        game.bullets.redDeath[i-1].src = "/images/space_shooter/bullets/red_hit_" + i + ".png";

        game.bullets.greenDeath[i-1] = new Image();
        game.bullets.greenDeath[i-1].src = "/images/space_shooter/bullets/green_hit_" + i + ".png";

        game.bullets.yellowDeath[i-1] = new Image();
        game.bullets.yellowDeath[i-1].src = "/images/space_shooter/bullets/yellow_hit_" + i + ".png";

    }



    game.bullets.roundGreen = {};
    game.bullets.roundGreen.image = new Image();
    game.bullets.roundGreen.loaded = false;
    game.bullets.roundGreen.image.onload = function() {
        game.bullets.roundGreen.loaded = true;
    };
    game.bullets.roundGreen.image.src = "/images/space_shooter/bullets/round_green.png";
    game.bullets.roundGreen.explode = function (modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer > .08) {
            this.image = game.bullets.greenDeath[0];
        } else if(this.deathTimer > .06) {
            this.image = game.bullets.greenDeath[1];
        } else if(this.deathTimer > .04) {
            this.image = game.bullets.greenDeath[2];
        } else if(this.deathTimer > .02) {
            this.image = game.bullets.greenDeath[3];
        } else if(this.deathTimer > 0) {
            this.image = game.bullets.greenDeath[4];
        } else {
            this.dead = true;
        }
    };

    game.bullets.roundBlue = {};
    game.bullets.roundBlue.image = new Image();
    game.bullets.roundBlue.loaded = false;
    game.bullets.roundBlue.image.onload = function() {
        game.bullets.roundGreen.loaded = true;
    };
    game.bullets.roundBlue.image.src = "/images/space_shooter/bullets/round_blue.png";
    game.bullets.roundBlue.explode = function (modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer > .08) {
            this.image = game.bullets.blueDeath[0];
        } else if(this.deathTimer > .06) {
            this.image = game.bullets.blueDeath[1];
        } else if(this.deathTimer > .04) {
            this.image = game.bullets.blueDeath[2];
        } else if(this.deathTimer > .02) {
            this.image = game.bullets.blueDeath[3];
        } else if(this.deathTimer > 0) {
            this.image = game.bullets.blueDeath[4];
        } else {
            this.dead = true;
        }
    };

    game.bullets.roundRed = {};
    game.bullets.roundRed.image = new Image();
    game.bullets.roundRed.loaded = false;
    game.bullets.roundRed.image.onload = function() {
        game.bullets.roundRed.loaded = true;
    };
    game.bullets.roundRed.image.src = "/images/space_shooter/bullets/round_red.png";
    game.bullets.roundRed.explode = function (modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer > .08) {
            this.image = game.bullets.redDeath[0];
        } else if(this.deathTimer > .06) {
            this.image = game.bullets.redDeath[1];
        } else if(this.deathTimer > .04) {
            this.image = game.bullets.redDeath[2];
        } else if(this.deathTimer > .02) {
            this.image = game.bullets.redDeath[3];
        } else if(this.deathTimer > 0) {
            this.image = game.bullets.redDeath[4];
        } else {
            this.dead = true;
        }
    };

    game.bullets.roundYellow = {};
    game.bullets.roundYellow.image = new Image();
    game.bullets.roundYellow.loaded = false;
    game.bullets.roundYellow.image.onload = function() {
        game.bullets.roundYellow.loaded = true;
    };
    game.bullets.roundYellow.image.src = "/images/space_shooter/bullets/round_yellow.png";
    game.bullets.roundYellow.explode = function (modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer > .08) {
            this.image = game.bullets.yellowDeath[0];
        } else if(this.deathTimer > .06) {
            this.image = game.bullets.yellowDeath[1];
        } else if(this.deathTimer > .04) {
            this.image = game.bullets.yellowDeath[2];
        } else if(this.deathTimer > .02) {
            this.image = game.bullets.yellowDeath[3];
        } else if(this.deathTimer > 0) {
            this.image = game.bullets.yellowDeath[4];
        } else {
            this.dead = true;
        }
    };


    game.bullets.straightGreenSmall = {};
    game.bullets.straightGreenSmall.image = new Image();
    game.bullets.straightGreenSmall.loaded = false;
    game.bullets.straightGreenSmall.onload = function () {
        game.bullets.straightGreenSmall.loaded = true;
    };
    game.bullets.straightGreenSmall.image.src = "/images/space_shooter/bullets/green_straight_small.png";
    game.bullets.straightGreenSmall.explode = function (modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer > .08) {
            this.image = game.bullets.greenDeath[0];
        } else if(this.deathTimer > .06) {
            this.image = game.bullets.greenDeath[1];
        } else if(this.deathTimer > .04) {
            this.image = game.bullets.greenDeath[2];
        } else if(this.deathTimer > .02) {
            this.image = game.bullets.greenDeath[3];
        } else if(this.deathTimer > 0) {
            this.image = game.bullets.greenDeath[4];
        } else {
            this.dead = true;
        }
    };

    game.bullet = function(x, y, speed, bullet, update) {
        this.x = x;
        this.y = y;
        this.notDying = true;
        this.deathTimer = .1;
        this.dead = false;
        this.speed = speed;
        this.bullet = bullet;
        this.image = this.bullet.image;
        this.update = update;
        this.draw = function() {
            game.ctx.drawImage(this.image, this.x, this.y);
        };
        this.explode = function() {
            this.notDying = false;
            this.x-=3;
            this.update = this.bullet.explode;
        };
    };
    return game;
}(SPACESHOOTER));