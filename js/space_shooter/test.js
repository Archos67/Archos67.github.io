(function (){
    var canvas = document.getElementById("game");
    canvas.width = 512;
    canvas.height = 480;
    var ctx = canvas.getContext("2d");

    var keysDown = {};

    addEventListener("keypress", function(e) {
       if(e.keyCode == 32) e.preventDefault();

    });
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    var bg = {};
    bg.image = new Image();
    bg.loaded = false;
    bg.image.onload = function () {
        bg.loaded = true;
    };
    bg.image.src = "/images/space_shooter/bg.jpg"
    bg.draw = function() {
        if(bg.loaded) {
            ctx.drawImage(bg.image, 0, 0);
        }
    };

    var hero = {};
    hero.image = new Image();
    hero.loaded = false;
    hero.image.onload = function () {
        hero.loaded = true;
    };
    hero.image.src = "/images/space_shooter/ships/hero.png"

    hero.x = 0;
    hero.y = 0;
    hero.speed = 256;// movement in pixels per second


    hero.draw = function() {
        if(hero.loaded) {
            ctx.drawImage(hero.image, hero.x, hero.y);
        }
    };

    hero.update = function (modifier) {
        if(16 in keysDown) {
            modifier = modifier / 2;
        }
        if (87 in keysDown) { // Player holding up
            hero.y -= hero.speed * modifier;
        }
        if (83 in keysDown) { // Player holding down
            hero.y += hero.speed * modifier;
        }
        if (65 in keysDown) { // Player holding left
            hero.x -= hero.speed * modifier;
        }
        if (68  in keysDown) { // Player holding right
            hero.x += hero.speed * modifier;
        }

        if(hero.x < 0) {
            hero.x = 0;
        }
        else if(hero.x > canvas.width - 25) {
            hero.x = canvas.width - 25;
        }
        if(hero.y < 30) {
            hero.y = 30;
        }
        else if(hero.y > canvas.height - 25) {
            hero.y = canvas.height - 25;
        }
    };

    var update = function (modifier) {
        hero.update(modifier);
    };

    var render = function () {
        bg.draw();
        hero.draw();
    };

    var reset = function () {
        hero.x = canvas.width/2;
        hero.y = canvas.height/2;
    }
    var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;

        requestAnimationFrame(main);
    };

    var then = Date.now();
    reset();
    main();
}())