/**
 * initializes the canvas and loads the music
 */
var SPACESHOOTER = (function () {
    var game = {};
    game.canvas = document.getElementById("game");
    game.canvas.width = 600;
    game.canvas.height = 600;
    game.ctx = game.canvas.getContext("2d");


    game.sfx = {};
    //music must be cloned to play simulatenously
    game.sfx.heroLaserAudio = new Audio('/sound/sfx/laser4_0.wav');
    game.sfx.heroLaser = function() {
        return game.sfx.heroLaserAudio.cloneNode();
    };
    game.sfx.enemyLaserAudio = new Audio('/sound/sfx/laser5.wav');
    game.sfx.enemyLaser = function() {
        return game.sfx.enemyLaserAudio.cloneNode();
    };
    game.sfx.shortExplosionAudio = new Audio('/sound/sfx/explosion4.wav');
    game.sfx.shortExplosion = function() {
        return game.sfx.shortExplosionAudio.cloneNode();
    };
    game.sfx.longExplosionAudio = new Audio('/sound/sfx/explosion1.wav');
    game.sfx.longExplosion = function() {
        return game.sfx.longExplosionAudio.cloneNode();
    };
    game.music = {};
    game.music.menuAudio = new Audio('/sound/music/bgm_menu.mp3');
    game.music.menu = function() {
        return game.music.menuAudio.cloneNode();
    };
    game.music.actionAudio = new Audio('/sound/music/bgm_action_3.mp3');

    game.music.action = function() {
        return game.music.actionAudio.cloneNode();
    };
    //event listeners
    game.keysDown = {};
    addEventListener("keypress", function (e) {
        if (e.keyCode == 32) e.preventDefault();
    });
    addEventListener("keydown", function (e) {
        game.keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete game.keysDown[e.keyCode];
    }, false);
    game.end = function() {
        game.ending = true;
        game.endTimer = 2;
    };
    game.song = game.music.menu();
    game.playing = false;
    game.score = 0;
    game.highScore = 0;
    game.remainingLives = 3;
    game.ending = false;
    return game;
}());