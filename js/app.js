let level = 1;
let counter = document.querySelector('.level');
let score = 0;
let scoreCounter = document.querySelector('.score');

// Enemy (bugs) constructor:

var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 120) + 30);
    this.sprite = 'images/enemy-bug.png';
};

// Enemy update method: 

Enemy.prototype.update = function (dt) {
    this.x = this.x + (this.speed * dt);

    // This will make the enemies re-appear on the Canvas:

    if (this.x > 550) {
        this.x = -80;
    }

    // This will detect collison and will reset the game:

    if (this.x < player.x + 65 && this.x + 65 > player.x && this.y < player.y + 50 && this.y + 50 > player.y) {
        player.x = 202;
        player.y = 402;
        level = 1;
        counter.innerHTML = level;
        swal(
            'THE BUGS CAUGHT YOU!',
            'Game over',
            'error'
        )
    }

};

// Drawing the enemy on the screen:

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Constructor for the player:

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Update method for the player:

Player.prototype.update = function (dt) {

    // Detecting Win:
    if (this.y < 0) {
        this.y = 402;
        this.x = 202;
        swal(
            'WOHOOO!',
            'LEVEL UPGRADED',
            'success'
        )

        levelCounter();

        scoreUpdate();
    }
};

// Drawing the Player on the screen:

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Making the Player move :

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up' && this.y > 0) {
        this.y = this.y - 87;
    }

    if (keyPress == 'down' && this.y < 380) {
        this.y = this.y + 87;
    }

    if (keyPress == 'left' && this.x > 20) {
        this.x = this.x - 100;
    }

    if (keyPress == 'right' && this.x < 380) {
        this.x = this.x + 100;
    }

};

// Creating the player:

const player = new Player(202, 402);

// Creating enemies:

const enemy = new Enemy(0, 140);
const enemy2 = new Enemy(0, 220);
const enemy3 = new Enemy(0, 50);

// Placing all enemies in an array:

let allEnemies = [enemy, enemy2, enemy3];


// This listens for key presses and sends the keys to Player.handleInput() method:

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Function to increase the level of the game on every sucessful end:

function levelCounter() {
    level++;
    counter.innerHTML = level;
};

// Function to update the Highest Score:

function scoreUpdate() {
    score++;
    scoreCounter.innerHTML = score
};