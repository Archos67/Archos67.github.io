/**
 * Contains the game loop and actually starts the game
 */
var SPACESHOOTER = (function(game) {
    // updates the game objects
    var update = function (modifier) {
        game.bg.update(modifier);
        if(game.playing) {
            game.formation.update(modifier);
            if(game.formation.over) {
                game.score += game.formation.points;
                game.formation = new game.formations[Math.floor(Math.random()*game.formations.length)]();
            }
            game.hero.update(modifier);

            for(var key in game.enemyBullets) {
                game.enemyBullets[key].update(modifier);
                game.hero.detectCollision(game.enemyBullets[key]);
                if(game.enemyBullets[key].dead || !game.bullets.inBounds(game.enemyBullets[key])) {
                    delete game.enemyBullets[key];
                }
            }

            for (var key in game.enemies) {
                game.enemies[key].update(modifier);
                if(game.enemies[key].dead) {
                    delete game.enemies[key];
                }
            }
            for(var key in game.playerBullets) {
                game.playerBullets[key].update(modifier);
                if(game.playerBullets[key].dead || !game.bullets.inBounds(game.playerBullets[key])) {
                    delete game.playerBullets[key];
                }
            }
            for(var key in game.enemies) {
                for(var bKey in game.playerBullets) {
                    game.enemies[key].detectCollision(game.playerBullets[bKey])
                }
            }
            for(var key in game.explosions) {
                game.explosions[key].update(modifier);
                if(game.explosions[key].dead) {
                    delete game.explosions[key];
                }
            }
            if(game.ending) {
                game.endTimer -= modifier;
                if(game.endTimer <= 0) {
                    game.reset();
                }
            }
        } else {
            game.mainmenu.update(modifier);
        }
    };
    // draws the game objects
    var render = function () {
        game.bg.draw();
        if(game.playing) {
            for (var key in game.explosions) {
                game.explosions[key].draw();
            }
            for (var key in game.enemies) {
                game.enemies[key].draw();
            }
            game.hero.draw()
            for (var key in game.playerBullets) {
                game.playerBullets[key].draw();
            }
            for (var key in game.enemyBullets) {
                game.enemyBullets[key].draw();
            }
            game.overlay.draw();
        } else {
            game.mainmenu.draw();
        }
    };

    var reset = function () {
        game.playing = false;
        game.ending = false;
        game.formation = new game.formations[Math.floor(Math.random()*game.formations.length)]();//Math.floor(Math.random()*game.formations.length)
        game.bg.reset();
        game.hero.reset(3);
        game.overlay.reset();
        game.enemyBullets = [];
        game.numberOfEnemyBullets = 0;
        game.explosion = [];
        game.numberOfExplosions = 0;
        game.enemies = [];
        game.numberOfEnemies = 0;
        game.mainmenu.reset();
        game.song.pause();
        game.song = game.music.menu();
        game.song.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        game.song.play();
    };

    var main = function () {
        var now = Date.now();
        var delta = now - game.then;

        update(delta / 1000);
        render();

        game.then = now;

        // Request to do this again ASAP
        requestAnimationFrame(main);
    };

    game.update = update;
    game.reset = reset;
    game.main = main;

    return game;
}(SPACESHOOTER));

//start the game
(function (game) {
    game.then = Date.now();
    game.reset();
    game.main();
})(SPACESHOOTER);