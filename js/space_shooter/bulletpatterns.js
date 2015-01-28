/**
 * Defines several bullet factories that create bullets with commonly used characteristics (homing, aimed, splitting, and angled)
 */
var SPACESHOOTER = (function(game) {
    game.bulletPatterns = {};
    game.bulletPatterns.homingBullet = function(source, bullet, speed, timeLimit) {
        var homing = new game.bullet(source.x + source.image.width/2 - bullet.image.width/2, source.y + source.image.height - 20,
            speed, bullet, function(modifier) {
                this.timeLimit -= modifier;
                if(this.timeLimit > 0) {
                    this.xDiff = game.hero.x - this.x;
                    this.yDiff = game.hero.y - this.y;
                    var denom = Math.abs(this.xDiff) + Math.abs(this.yDiff);
                    this.x += (this.xDiff * this.speed * modifier) / (denom);
                    this.y += (this.yDiff * this.speed * modifier) / (denom);
                }
                else {
                    var denom = Math.abs(this.xDiff) + Math.abs(this.yDiff);
                    this.x += this.xDiff * this.speed * modifier/ (denom);
                    this.y += this.yDiff * this.speed * modifier  / (denom);
                }
        });
        homing.timeLimit = timeLimit;
        game.addEnemyBullet(homing);
    };
    game.bulletPatterns.straightShot = function(source, bullet, speed) {
        var shot = new game.bullet(source.x + source.image.width/2 - bullet.image.width/2, source.y + source.image.height - 20,
            speed, bullet, function(modifier) {

                var denom = Math.abs(this.xDiff) + Math.abs(this.yDiff);
                this.x += (this.xDiff * this.speed * modifier) / (denom);
                this.y += (this.yDiff * this.speed * modifier) / (denom);
            });
        shot.xDiff = game.hero.x - shot.x;
        shot.yDiff = game.hero.y - shot.y;
        game.addEnemyBullet(shot);

    };

    game.bulletPatterns.octagonShot = function(source, bullet, speed) {
        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x += this.speed * modifier;
            }));
        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.y += this.speed * modifier;
            }));

        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x -= this.speed * modifier;
            }));
        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.y -= this.speed * modifier;
            }));


        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x -= this.speed * modifier / 2;
                this.y -= this.speed * modifier / 2;
            }));
        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x += this.speed * modifier / 2;
                this.y -= this.speed * modifier / 2;
            }));

        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x -= this.speed * modifier / 2;
                this.y += this.speed * modifier / 2;
            }));

        game.addEnemyBullet(new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x += this.speed * modifier / 2;
                this.y += this.speed * modifier / 2;
            }));
    };

    game.bulletPatterns.angleShot = function(source, bullet, speed, angle) {
        var angleshot = new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.x += Math.cos(this.angle) * this.speed * modifier;
                this.y += Math.sin(this.angle) * this.speed * modifier;
            });
        angleshot.angle =  angle * (Math.PI/180);
        game.addEnemyBullet(angleshot);
    };

    game.bulletPatterns.splitBullet = function(source, bullet, speed, angle, time, bullets) {
        var splitter = new game.bullet(source.x + source.image.width/2 - bullet.image.width/2,
            source.y + source.image.height - 20, speed, bullet, function(modifier) {
                this.time -= modifier;

                console.log(this.time)
                if(this.time < 0) {
                    for(var key in bullets) {
                        bullets[key](this.x, this.y);
                    }
                    this.dead = true;
                    return;
                }
                this.x += Math.cos(this.angle) * this.speed * modifier;
                this.y += Math.sin(this.angle) * this.speed * modifier;
                });

        splitter.time = time;
        splitter.angle  = angle * (Math.PI/180);
        game.addEnemyBullet(splitter);
    };

    return game;
}(SPACESHOOTER));