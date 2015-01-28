/**
 * Define the hero object which takes in input from the player and blows up upon collision with enemy bullets.
 */
var SPACESHOOTER = (function(game) {
    var hero = {};
    hero.heroImage = new Image();
    hero.loaded = false;
    hero.heroImage.onload = function () {
        hero.loaded = true;
    };
    hero.heroImage.src = "/images/space_shooter/ships/hero.png"

    hero.x = 0;
    hero.y = 0;
    hero.deathTime = 1;
    hero.deathTimer = hero.deathTime;
    hero.numberOfBullets = 0;
    hero.speed = 300;// movement in pixels per second
    hero.invincibleTime = 2;
    hero.invincibleTimer = hero.invincibleTime;
    hero.invincible = false;
    hero.notDying = true;
    hero.lastFired = Date.now();

    hero.explosion = function () {
        return new game.explosionMod.explosion(hero.x + hero.heroImage.width/2, hero.y + hero.heroImage.height/2, 1, game.explosionMod.heroExplosion, this.deathTime);
    };

    hero.fire = function() {
        var now = Date.now();
        if((now - hero.lastFired) > 100) {
            hero.lastFired = now;

            var bullet = new game.bullet(hero.x + 3, hero.y -  2, 600,  game.bullets.straightGreenSmall, function(modifier) {
                this.y -= this.speed * modifier;
                this.dead = this.y < 24;
            });

            game.playerBullets[hero.numberOfBullets] = bullet;
            hero.numberOfBullets++;

            bullet = new game.bullet(hero.x + 16, hero.y -  2, 600,  game.bullets.straightGreenSmall, function(modifier) {
                this.y -= this.speed * modifier;
                this.dead = this.y < 24;
            });

            game.playerBullets[hero.numberOfBullets] = bullet;
            hero.numberOfBullets++;

            var sound = game.sfx.heroLaser();
            sound.volume = .1;
            sound.play();
        }
    }
    hero.draw = function() {
        if(hero.loaded) {
            game.ctx.drawImage(hero.image, hero.x, hero.y);
        }
    };

    hero.update = function (modifier) {
        if(!hero.notDying) {
            hero.deathTimer -= modifier;
            if(hero.deathTimer < 0) {
                hero.reset(hero.remainingLives);
                hero.invincible = true;
            }
        } else {
            if(hero.invincible) {
                hero.invincibleTimer -= modifier;
                //dat blink
                if(hero.invincibleTime * 7/8 < hero.invincibleTimer) {
                    hero.image = hero.heroImage;
                } else if(hero.invincibleTime * 6/8 < hero.invincibleTimer) {
                    hero.image = new Image();
                } else if(hero.invincibleTime * 5/8 < hero.invincibleTimer) {
                    hero.image = hero.heroImage;
                } else if(hero.invincibleTime * 4/8 < hero.invincibleTimer) {
                    hero.image = new Image();
                } else if(hero.invincibleTime * 3/8 < hero.invincibleTimer) {
                    hero.image = hero.heroImage;
                } else if(hero.invincibleTime * 2/8 < hero.invincibleTimer) {
                    hero.image = new Image();
                } else if(hero.invincibleTime * 1/8 < hero.invincibleTimer) {
                    hero.image = hero.heroImage;
                } else if(0 < hero.invincibleTimer) {
                    hero.image = new Image();
                } else {
                    hero.invincible = false;
                    hero.image = hero.heroImage;
                }
            }
            if (16 in game.keysDown) {
                modifier = modifier / 2.2;
            }
            if (87 in game.keysDown) { // Player holding up
                hero.y -= hero.speed * modifier;
            }
            if (83 in game.keysDown) { // Player holding down
                hero.y += hero.speed * modifier;
            }
            if (65 in game.keysDown) { // Player holding left
                hero.x -= hero.speed * modifier;
            }
            if (68  in game.keysDown) { // Player holding right
                hero.x += hero.speed * modifier;
            }
            if (74 in game.keysDown) {
                hero.fire();
            }
            if (hero.x < 0) {
                hero.x = 0;
            }
            else if (hero.x > game.canvas.width - 25) {
                hero.x = game.canvas.width - 25;
            }
            if (hero.y < 30) {
                hero.y = 30;
            }
            else if (hero.y > game.canvas.height - 25) {
                hero.y = game.canvas.height - 25;
            }
        }
    };
    hero.detectCollision = function(bullet) {
        if(hero.notDying && bullet.notDying
        && bullet.x + bullet.image.width - 5 > hero.x + 9
        && bullet.x  + 5 < hero.x + 16
        && bullet.y + bullet.image.height - 5 > hero.y + 10
        && bullet.y + 5 < hero.y + 12){
            if(!hero.invincible) {
                hero.hit();
            }
            bullet.explode();
        }
    };
    hero.hit = function() {
        if(!hero.invincible) {
            var sound = game.sfx.longExplosion();
            sound.volume = .5;
            sound.play();
            game.addExplosion(hero.explosion());
            if(hero.remainingLives < 1) {
                game.end();
                hero.deathTimer = 10;
                hero.notDying = false;
                hero.image = new Image();
            } else {
                hero.remainingLives--;
                hero.invincible = true;
                hero.notDying = false;
                hero.deathTimer = hero.deathTime;
                hero.invincibleTimer = hero.invincibleTime;
                hero.image = new Image();
            }
        }
    }
    hero.reset = function(remainingLives) {
        hero.x = game.canvas.width /2;
        hero.y = game.canvas.width /2;
        if(!isNaN(hero.remainingLives))
            hero.remainingLives = remainingLives;
        else
            hero.remainingLives = 3;
        hero.notDying = true;
        hero.image = hero.heroImage;
        hero.deathTimer = hero.deathTime;
        hero.invincible = false;
    };

    game.hero = hero;
    game.hero.remainingLives = 3;
    return game;
})(SPACESHOOTER);