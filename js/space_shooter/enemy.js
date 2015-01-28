/**
 * Defines the enemies which antagonist the player. This file defines properties such as their ships and their behaviour
 * upon death.
 */
var SPACESHOOTER = (function(game) {
    game.enemy = {};
    game.enemies = [];
    game.numberOfEnemies = 0;
    game.addEnemy = function(enemy) {
        game.enemies[game.numberOfEnemies] = enemy;
        game.numberOfEnemies++;
    };
    game.ships = {};
    game.ships.blackPhantom = {};
    game.ships.blackPhantom.image = new Image();
    game.ships.blackPhantom.hitImage = new Image();
    game.ships.blackPhantom.loaded = false;
    game.ships.blackPhantom.image.onload = function() {
        game.ships.blackPhantom.loaded = true;
    };
    game.ships.blackPhantom.hitImage.src = "/images/space_shooter/ships/black_phantom_hit.png";
    game.ships.blackPhantom.hitImage.onload = function() {
        game.ships.blackPhantom.loaded = true;
    };
    game.ships.blackPhantom.image.src = "/images/space_shooter/ships/black_phantom.png";
    game.ships.blackPhantom.detectCollision = function(bullet){
        if(bullet.notDying
            && this.notDying
            && bullet.x  > this.x + 2
            && bullet.x  < this.x + 98 - bullet.image.width
            && bullet.y < this.y + 37
            && bullet.y > this.y + 0) {
            this.hit();
            bullet.explode();
        }
    };

    game.ships.blackPhantom.explosionScale = 1.5;
    game.ships.blackPhantom.explosionImages = game.explosion.starImages;
    game.ships.blackPhantom.die = function(modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer < 0) {
            game.score = game.score +  this.score;
            this.dead = true;
        }
    };
    game.ships.blackPhantom.deathSound = game.sfx.longExplosion;
    game.ships.blackPhantom.deathTimer= 1.2;


    game.ships.yellowJacket= {};
    game.ships.yellowJacket.image = new Image();
    game.ships.yellowJacket.hitImage = new Image();
    game.ships.yellowJacket.loaded = false;
    game.ships.yellowJacket.image.onload = function() {
        game.ships.yellowJacket.loaded = true;
    };
    game.ships.yellowJacket.image.src = "/images/space_shooter/ships/yellow_jacket.png";

    game.ships.yellowJacket.hitImage.onload = function() {
        game.ships.yellowJacket.loaded = true;
    };
    game.ships.yellowJacket.hitImage.src = "/images/space_shooter/ships/yellow_jacket_hit.png";
    game.ships.yellowJacket.detectCollision = function(bullet){
        if(bullet.notDying
            && this.notDying
            && bullet.x  > this.x
            && bullet.x  < this.x + this.image.width - bullet.image.width
            && bullet.y < this.y + this.image.height - 2
            && bullet.y > this.y) {
            this.hit();
            bullet.explode();
        }
    };

    game.ships.yellowJacket.explosionScale = .75;
    game.ships.yellowJacket.explosionImages = game.explosion.starImages;
    game.ships.yellowJacket.die = function(modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer < 0) {
            game.score = game.score +  this.score;
            this.dead = true;
        }
    };
    game.ships.yellowJacket.deathSound = game.sfx.shortExplosion;
    game.ships.yellowJacket.deathTimer= .8;


    game.ships.purpleBee = {};
    game.ships.purpleBee.image = new Image();
    game.ships.purpleBee.hitImage = new Image();
    game.ships.purpleBee.loaded = false;
    game.ships.purpleBee.image.onload = function() {
        game.ships.purpleBee.loaded = true;
    };
    game.ships.purpleBee.image.src = "/images/space_shooter/ships/purple_bee.png";

    game.ships.purpleBee.hitImage.onload = function() {
        game.ships.purpleBee.loaded = true;
    };
    game.ships.purpleBee.hitImage.src = "/images/space_shooter/ships/purple_bee_hit.png";
    game.ships.purpleBee.detectCollision = function(bullet){
        if(bullet.notDying
            && this.notDying
            && bullet.x  > this.x
            && bullet.x  < this.x + this.image.width - bullet.image.width
            && bullet.y < this.y + this.image.height - 2
            && bullet.y > this.y) {
            this.hit();
            bullet.explode();
        }
    };

    game.ships.purpleBee.explosionScale = .75;
    game.ships.purpleBee.explosionImages = game.explosion.starImages;
    game.ships.purpleBee.die = function(modifier) {
        this.deathTimer -= modifier;
        if(this.deathTimer < 0) {
            game.score = game.score +  this.score;
            this.dead = true;
        }
    };
    game.ships.purpleBee.deathSound = game.sfx.shortExplosion;
    game.ships.purpleBee.deathTimer= 1;



    game.enemy = function (x, y, speed, health, score, ship, update, patterns) {
        this.x = x;
        this.y = y;
        this.deathTimer = 0;
        this.score = score;
        this.dead = false;
        this.speed = speed;
        this.created = Date.now()
        this.lastFired = this.created;
        this.health = health;
        this.fullHealth = health;
        this.ship = ship;
        this.notDying = true;
        this.image = this.ship.image;
        this.update = update;
        this.hitCountDown = 0;
        this.patterns = patterns;
        this.draw = function() {
            game.ctx.beginPath();
            game.ctx.strokeStyle = "#FF0000";
            game.ctx.lineWidth = 3;
            game.ctx.arc(this.x + this.image.width/2, this.y + this.image.height/2, this.image.width*5/6,0, 2*Math.PI*(this.health/this.fullHealth));
            game.ctx.stroke();
            game.ctx.closePath();
            game.ctx.drawImage(this.image, this.x, this.y);
        };
        this.hit = function() {
            if (this.health <= 1) {
                //die
                this.deathTimer = this.ship.deathTimer;
                this.notDying = false;
                this.update = this.die;
                this.image = this.ship.image;
                var sound = this.ship.deathSound();
                sound.volume = .5;
                sound.play();
                game.addExplosion((new game.explosionMod.explosion(this.x + this.image.width/2, this.y + this.image.height/2, this.ship.explosionScale, this.ship.explosionImages, this.deathTimer)));

                this.image = new Image();
                this.hit = function () {};
            } else {
                this.image = this.ship.hitImage;
                this.hitCountDown = .10;
                this.health--;
            }
        };
        this.detectCollision = this.ship.detectCollision;

        this.die = this.ship.die;
    };
    return game;
}(SPACESHOOTER));