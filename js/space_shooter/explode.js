/**
 * Defines the explosion module that handles the logic and explosion objects, as well as loading their images.
 */
var SPACESHOOTER = (function(game) {
    game.explosion = {};
    game.explosionMod = {};
    game.explosions = [];
    game.numberOfExplosions = 0;

    game.explosion.starImages = [];
    for(var i = 0; i <= 23; i++) {
        game.explosion.starImages[i] = new Image();
        game.explosion.starImages[i].src = "/images/space_shooter/explosions/star/expl_11_" + (1e4 + i + "").slice(1) + '.png';
    }

    game.explosionMod.heroExplosion = [];
    for(var i = 0; i <= 31; i++) {
        game.explosionMod.heroExplosion[i] = new Image();
        game.explosionMod.heroExplosion[i].src = "/images/space_shooter/explosions/hero/expl_09_" + (1e4 + i + "").slice(1) + '.png';
    }
    game.explosionMod.explosion = function(centerX, centerY, scale, images, deathTime) {
        this.x = centerX - ((images[22].width/2) * scale);
        this.y = centerY - ((images[22].height/2) * scale);
        this.image = images[0];
        this.images = images;
        this.scale = scale;
        this.deathTime = deathTime;
        this.dead = false;
        this.deathTimeOriginal = deathTime;
        this.update = function(modifier) {
            this.deathTime -= modifier;
            if(this.deathTime <= 0) {
                this.dead = true;
            }
            //this.y += modifier * 350;
            this.image = this.images[
                Math.floor(this.images.length - (this.deathTime/this.deathTimeOriginal) * this.images.length)
                ];
            if(this.y > 800) {
                this.dead = true;
            }
        };
        this.draw = function() {
            game.ctx.drawImage(this.image, this.x, this.y, this.scale * this.image.width, this.scale* this.image.height);
        };
    }

    game.addExplosion = function(explosion) {
        game.explosions[game.numberOfExplosions] = explosion;
        game.numberOfExplosions++;
    };
    return game;
} (SPACESHOOTER));