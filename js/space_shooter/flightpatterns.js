/**
 * Defines the various flight patterns that occur in the game. The core gameplay is contained in thie file.
 */
var SPACESHOOTER = (function(game) {
    game.formations = [];
    game.flightPatterns = {};
    game.flightPatterns.jacketAttack = {};
    game.flightPatterns.jacketAttack = function() {
        this.time = 10;
        this.over = false;
        this.points = 300;
        this.numActions = 0
        this.addEnemies = function(bulletChoice1, bulletChoice2) {
            game.addEnemy(new game.enemy(100, 0, 125, 5, 100, game.ships.yellowJacket, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.y += this.speed * modifier;
                if (this.y > game.canvas.height) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 350) {
                    this.patterns[0](this);
                    this.lastFired = now;
                }
            }, [function (source) {
                game.bulletPatterns.straightShot(source, bulletChoice1, 300);
            }]));
            game.addEnemy(new game.enemy(game.canvas.width - 100 - game.ships.yellowJacket.image.width, 0, 125, 5, 100, game.ships.yellowJacket, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.y += this.speed * modifier;
                if (this.y > game.canvas.height) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 350) {
                    this.patterns[0](this);
                    this.lastFired = now;
                }
            }, [function (source) {
                game.bulletPatterns.straightShot(source, bulletChoice2, 300);
            }]));
        };
        this.update = function(modifier) {
            this.time -= modifier;
            if(this.numActions == 0) {
                this.addEnemies(game.bullets.roundYellow, game.bullets.roundBlue);
                this.numActions++
            } else if(this.numActions == 1 && this.time < 8) {
                this.addEnemies(game.bullets.roundBlue, game.bullets.roundYellow);
                this.numActions++;
            } else if(this.numActions == 2 && this.time < 6) {
                this.addEnemies(game.bullets.roundYellow, game.bullets.roundBlue);
                this.numActions++;
            } else if(this.numActions == 3 && this.time < 4) {
                this.addEnemies(game.bullets.roundBlue, game.bullets.roundYellow);
                this.numActions++;
            } else if(this.numActions == 4 && this.time < 2) {
                this.addEnemies(game.bullets.roundYellow, game.bullets.roundBlue);
                this.numActions++;
            } else if(this.time < -6 && this.numActions == 5) {
                this.over = true;
            }
        };
    };
    game.formations[0] = game.flightPatterns.jacketAttack;

    game.flightPatterns.beeSting = function () {
        this.time = 12;
        this.over = false;
        this.points = 2000;
        this.numActions = 0;
        this.addEnemies1 = function(bulletChoice1, bulletChoice2) {
            // top
            var enemy1 = new game.enemy(100, 0, 125, 10, 250, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 70 * modifier;
                this.deltaX -= 40 * modifier;
                this.y += this.deltaY * modifier;
                this.x += this.deltaX * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 400) {if(! this.angle) {
                    this.angle = 0;
                }
                    this.patterns[0](this, this.angle);
                    this.patterns[0](this, (this.angle + 135) % 360);
                    this.patterns[0](this, (this.angle + 270) % 360);
                    this.angle+= 15;
                    this.angle %= 360;
                    this.lastFired = now;
                }
            }, [function (source, angle) {
                game.bulletPatterns.angleShot(source, bulletChoice1, 200,  angle);
            }]);
            enemy1.deltaX = 100;
            enemy1.deltaY = 200;
            game.addEnemy(enemy1);
            var enemy2 = new game.enemy(400, 0, 125, 10, 250, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 70 * modifier;
                this.deltaX += 40 * modifier;
                this.y += this.deltaY * modifier;
                this.x += this.deltaX * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 400) {if(! this.angle) {
                    this.angle = 0;
                }
                    this.patterns[0](this, this.angle);
                    this.patterns[0](this, (this.angle + 135) % 360);
                    this.patterns[0](this, (this.angle + 270) % 360);
                    this.angle+= 15;
                    this.angle %= 360;
                    this.lastFired = now;
                }
            }, [function (source, angle) {
                game.bulletPatterns.angleShot(source, bulletChoice2, 200,  angle);
            }]);
            enemy2.deltaX = -80;
            enemy2.deltaY = 220;
            game.addEnemy(enemy2);
        };

        this.addEnemies2 = function(bulletChoice) {
            var enemy1 = new game.enemy(250, 0, 125, 20, 500, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 30 * modifier;
                this.deltaX -= 10 * modifier;
                this.y += this.deltaY * modifier;
                this.x += this.deltaX * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 100) {
                    if(! this.angle) {
                        this.angle = 0;
                    }
                    this.patterns[0](this, this.angle);
                    this.patterns[0](this, (this.angle + 135) % 360);
                    this.patterns[0](this, (this.angle + 270) % 360);
                    this.angle -= 15;
                    this.angle %= 360;
                    this.lastFired = now;
                }
            }, [function (source, angle) {
                game.bulletPatterns.angleShot(source, bulletChoice, 250,  angle);
            }]);
            enemy1.deltaX = 20;
            enemy1.deltaY = 130;
            game.addEnemy(enemy1);
        };

        this.addEnemies3 = function(bulletChoice1, bulletChoice2) {
            var enemy1 = new game.enemy(400, 0, 125, 20, 250, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 80 * modifier;
                this.deltaX += 80 * modifier;
                this.x += this.deltaX * modifier;
                this.y += this.deltaY * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 90) {
                    if(! this.angle) {
                        this.angle = 0;
                    }
                    this.patterns[0](this, this.angle);
                    this.patterns[0](this, (this.angle + 135) % 360);
                    this.patterns[0](this, (this.angle + 270) % 360);
                    this.angle -= 15;
                    this.angle %= 360;
                    this.lastFired = now;
                }
            }, [function (source, angle) {
                game.bulletPatterns.angleShot(source, bulletChoice1, 250,  angle);
            }]);
            enemy1.deltaX = -200;
            enemy1.deltaY = 200;
            game.addEnemy(enemy1);
            var enemy2 = new game.enemy(100, 0, 125, 20, 250, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 80 * modifier;
                this.deltaX -= 80 * modifier;
                this.x += this.deltaX * modifier;
                this.y += this.deltaY * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 90) {
                    if(! this.angle) {
                        this.angle = 0;
                    }
                    this.patterns[0](this, this.angle);
                    this.patterns[0](this, (this.angle + 135) % 360);
                    this.patterns[0](this, (this.angle + 270) % 360);
                    this.angle -= 15;
                    this.angle %= 360;
                    this.lastFired = now;
                }
            }, [function (source, angle) {
                game.bulletPatterns.angleShot(source, bulletChoice2, 250,  angle);
            }]);
            enemy2.deltaX = 200;
            enemy2.deltaY = 200;
            game.addEnemy(enemy2);
        };
        this.update = function(modifier) {
            this.time -= modifier;
            if(this.numActions == 0) {
                this.addEnemies1(game.bullets.roundYellow, game.bullets.roundBlue);
                this.numActions++
            } else if(this.numActions == 1 && this.time < 8) {
                this.addEnemies2(game.bullets.roundGreen);
                this.numActions++;
            } else if(this.numActions == 2 && this.time < 4) {
                this.addEnemies3(game.bullets.roundRed, game.bullets.roundYellow);
                this.numActions++;
            } else if(this.time < -2 && this.numActions == 3) {
                this.over = true;
            }
        }
    };

    game.formations[1] = game.flightPatterns.beeSting;

    game.flightPatterns.phantomOnslaught = function() {
        this.time = 60;
        this.over = false;
        this.points = 10000;
        this.numActions = 0;
        this.addEnemies = function() {
            var enemy1 = new game.enemy(50, 0, 125, 700, 10000, game.ships.blackPhantom, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }

                this.x += this.deltaX * modifier;
                this.y += this.deltaY * modifier;

                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 100) {
                    this.lastFired = now;
                    if(this.numberFired > 14 && this.numberFired < 114 && this.numberFired %2 == 0) {
                        this.deltaX = 0;
                        this.deltaY = 0;
                        game.bulletPatterns.straightShot(this, game.bullets.roundRed, 400);
                    } else if(this.numberFired > 114 && this.numberFired < 160 && this.numberFired %3== 0) {
                        this.deltaX = 50;
                        this.deltaY = -20;
                        game.bulletPatterns.octagonShot(this, game.bullets.roundRed, 500)
                    } else if(this.numberFired >= 160 && this.numberFired < 200 && this.numberFired %3 == 0) {
                        this.deltaX = -100;
                        this.deltaY = -10;
                        game.bulletPatterns.octagonShot(this, game.bullets.roundRed, 500)
                    } else if(this.numberFired >= 200 && this.numberFired < 240 && this.numberFired %3 == 0) {
                        this.deltaX = 50;
                        this.deltaY = 30;
                        game.bulletPatterns.octagonShot(this, game.bullets.roundRed, 500)
                    } else if(this.numberFired >= 240 && this.numberFired < 300) {
                        this.deltaX = 0;
                        this.deltaY = 0;
                        if(this.numberFired%3 == 0) {
                            game.bulletPatterns.straightShot(this, game.bullets.roundYellow, 400)
                        }
                        if(this.numberFired%5 == 0) {
                            game.bulletPatterns.octagonShot(this, game.bullets.roundRed, 300);
                        }
                    } else if(this.numberFired >= 320 && this.numberFired < 500) {
                        var shot = this.numberFired % 10;
                        if(shot === 0) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 0);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 60);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 120);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 180);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 240);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 300);
                        } else if(shot === 1) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 15);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 75);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 135);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 195);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 255);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 315);

                        } else if(shot === 2) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 30);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 90);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 150);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 210);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 270);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 330);

                        } else if(shot === 3) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 45);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 105);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 165);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 225);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 285);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 345);

                        } else if(shot === 4) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 45);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 105);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 165);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 225);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 285);
                            game.bulletPatterns.angleShot(this,game.bullets.roundBlue, 300, 345);
                        } else if(shot === 5) {
                            //game.bulletPatterns.straightShot(this,game.bullets.roundYellow,400,2);
                        } else if(shot === 6) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 30);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 90);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 150);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 210);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 270);
                            game.bulletPatterns.angleShot(this,game.bullets.roundGreen, 300, 330);
                        } else if(shot === 7) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 10);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 70);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 130);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 190);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 250);
                            game.bulletPatterns.angleShot(this,game.bullets.roundYellow, 300, 310);
                        } else if(shot === 8) {
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 0);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 60);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 120);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 180);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 240);
                            game.bulletPatterns.angleShot(this,game.bullets.roundRed, 300, 300);
                        } else {
                            //game.bulletPatterns.straightShot(this,game.bullets.roundYellow,400,2);
                        }
                    } else if(this.numberFired > 500) {
                        this.deltaY = -100;
                        this.deltaX = 50;
                        if(this.y < 0) {
                            this.dead = true;
                        }
                    }
                    this.numberFired++;
                }
            });
            enemy1.deltaX = 100;
            enemy1.deltaY = 100;
            enemy1.numberFired = 0;
            game.addEnemy(enemy1);
        };
        this.update = function(modifier) {
            this.time -= modifier;
            if (this.numActions == 0) {
                this.addEnemies(game.bullets.roundYellow, game.bullets.roundBlue);
                this.numActions++
            } else if (this.time < 0 && this.numActions == 1) {
                this.over = true;
            }
        };
    };
    game.formations[2] = game.flightPatterns.phantomOnslaught;

    game.flightPatterns.homingHell = function() {
        this.time = 12;
        this.over = false;
        this.points = 1500;
        this.numActions = 0;
        this.addEnemies = function(bulletChoice1, bulletChoice2) {
            var enemy1 = new game.enemy(100, 0, 125, 10, 250, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 30 * modifier;
                //this.deltaX -= 10 * modifier;
                this.y += this.deltaY * modifier;
                this.x += this.deltaX * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 150) {
                    this.patterns[0](this);
                    this.lastFired = now;
                }
            }, [function (source) {
                game.bulletPatterns.homingBullet(source, bulletChoice1, 200, 2);
            }]);
            enemy1.deltaX = 50;
            enemy1.deltaY = 150;
            game.addEnemy(enemy1)
            var enemy2 = new game.enemy(500, 600, 125, 10, 250, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY += 30 * modifier;
                //this.deltaX += 10 * modifier;
                this.y += this.deltaY * modifier;
                this.x += this.deltaX * modifier;
                if (this.y > 600) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 150) {
                    this.patterns[0](this);
                    this.lastFired = now;
                }
            }, [function (source) {
                game.bulletPatterns.homingBullet(source, bulletChoice2, 200, 2);
            }]);
            enemy2.deltaX = -50;
            enemy2.deltaY = -150;
            game.addEnemy(enemy2)
        };

        this.update = function(modifier) {
            this.time -= modifier;
            if (this.numActions == 0) {
                this.addEnemies(game.bullets.roundRed, game.bullets.roundGreen);
                this.numActions++
            } else if (this.time < 0 && this.numActions == 1) {
                this.over = true;
            }
        };
    };
    game.formations[3] = game.flightPatterns.homingHell;


    game.flightPatterns.splitDoom = function() {
        this.time = 12;
        this.over = false;
        this.points = 1000;
        this.numActions = 0;
        this.addEnemies = function(bulletChoice1, bulletChoice2) {
            var enemy1 = new game.enemy(100, 0, 125, 50, 500, game.ships.purpleBee, function (modifier) {
                this.hitCountDown -= modifier;
                if (this.hitCountDown < 0) {
                    this.image = this.ship.image;
                }
                this.deltaY -= 15 * modifier;
                //this.deltaX -= 10 * modifier
                this.timer -=modifier;
                if(this.timer < 0) {
                    this.timer = 3;
                }
                this.y += this.deltaY * modifier;
                this.x += this.deltaX * modifier;
                if (this.y < 0) {
                    this.dead = true;
                    return;
                }
                var now = Date.now();
                if (now - this.lastFired > 100) {
                    this.patterns[0](this,this.timer);
                    this.lastFired = now;
                }
            }, [function (source, timer) {
                game.bulletPatterns.splitBullet(source, bulletChoice1, timer * 360 % 360, 90, timer,
                    [
                        function (x, y) {
                            var meh = {};
                            meh.x = x;
                            meh.y = y;
                            meh.image = bulletChoice1.image;
                            game.bulletPatterns.straightShot(meh,bulletChoice2,800);
                        },
                    ]);
            }])
            enemy1.timer = 3;
            enemy1.deltaX = 40;
            enemy1.deltaY = 75;
            game.addEnemy(enemy1)
        };
        this.update = function(modifier) {
            this.time -= modifier;
            if (this.numActions == 0) {
                this.addEnemies(game.bullets.roundRed, game.bullets.roundGreen);
                this.numActions++
            } else if (this.time < 0 && this.numActions == 1) {
                this.over = true;
            }
        };

    };
    game.formations[4] = game.flightPatterns.splitDoom;

    return game;
}(SPACESHOOTER));