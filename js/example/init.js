var EXAMPLE = (function() {
  var game = {};
  game.canvas = document.getElementById("game");
  game.canvas.width = 512;
  game.canvas.height = 480;
  game.ctx = game.canvas.getContext("2d");
  game.bgReady = false;
  // images
  game.bgImage = new Image();
  game.bgImage.onload = function() {
    game.bgReady = true;
  }
  game.bgImage.src = "/images/example/background.png"

  game.heroReady = false;
  game.heroImage = new Image()
  game.heroImage.onload = function () {
    game.heroReady = true;
  }
  game.heroImage.src = "/images/example/hero.png";

  game.monsterReady = false;
  game.monsterImage = new Image()
  game.monsterImage.onload = function () {
    game.monsterReady = true;
  }
  game.monsterImage.src = "/images/example/monster.png";

  // Game objects
  game.hero = {
    speed: 256, // movement in pixels per second
    x: 0,
    y: 0
  };
  game.monster = {
    x: 0,
    y: 0
  };
  game.monstersCaught = 0;

  //
  game.keysDown = {};

  addEventListener("keydown", function (e) {
    game.keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete game.keysDown[e.keyCode];
  }, false);

  game.reset = function () {
      game.hero.x = game.canvas.width / 2;
      game.hero.y = game.canvas.height / 2;

      // Throw the monster somewhere on the screen randomly
      game.monster.x = 32 + (Math.random() * (game.canvas.width - 64));
      game.monster.y = 32 + (Math.random() * (game.canvas.height - 64));
  };
  // Update game objects
  game.update = function (modifier) {
    if (87 in game.keysDown) { // Player holding up
      game.hero.y -= game.hero.speed * modifier;
    }
    if (83 in game.keysDown) { // Player holding down
      game.hero.y += game.hero.speed * modifier;
    }
    if (65 in game.keysDown) { // Player holding left
      game.hero.x -= game.hero.speed * modifier;
    }
    if (68  in game.keysDown) { // Player holding right
      game.hero.x += game.hero.speed * modifier;
    }

    // Are they touching?
    if (
        game.hero.x <= (game.monster.x + 32)
        && game.monster.x <= (game.hero.x + 32)
        && game.hero.y <= (game.monster.y + 32)
        && game.monster.y <= (game.hero.y + 32)
    ) {
      ++game.monstersCaught;
      game.reset();
    }
  };

  game.render = function () {
    if (game.bgReady) {
      game.ctx.drawImage(game.bgImage, 0, 0);
    }

    if (game.heroReady) {
      game.ctx.drawImage(game.heroImage, game.hero.x, game.hero.y);
    }

    if (game.monsterReady) {
      game.ctx.drawImage(game.monsterImage, game.monster.x, game.monster.y);
    }

    // Score
    game.ctx.fillStyle = "rgb(250, 250, 250)";
    game.ctx.font = "24px Helvetica";
    game.ctx.textAlign = "left";
    game.ctx.textBaseline = "top";
    game.ctx.fillText("Monsters caught: " + game.monstersCaught, 32, 32);
  };

  // The main game loop
  game.main = function () {
    game.now = Date.now();
    game.delta = game.now - game.then;

    game.update(game.delta / 1000);
    game.render();

    game.then = game.now;

    // Request to do this again ASAP
    requestAnimationFrame(game.main);
  };
  return game;
 }())
