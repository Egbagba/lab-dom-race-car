class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");

        // I am going to create a player in the future, For this moment of the code-along, I will leave it to null.
        this.player = new Player( // the numbers below are displaying the 'px' position of the car on the road from the left, top, width and height.
            this.gameScreen, 
            200, 
            500, 
            100, 
            150, "docs/images/car.png");


        // Style for the Game
        this.height = 600;
        this.width = 500;

        // Obstacles from or In the Game
        this.obstacles = [];

        // Scores from the Game
        this.score = 0

        // Lives to have in the game
        this.lives = 3;

        // Variable to Check if I'm in the process of creating an obstacle
        this.isPushingObstacle = false;

        // Variable to Check if the Game is Over
        this.gameIsOver = false;
        
        // Game sound code.
        this.soundtrack = null;

    }
    start(){
        // Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        // Hides the start screen.
        this.startScreen.style.display = "none";

        // Shows the game screen.
        this.gameScreen.style.display = "block";

        // Add sound to game.
        this.soundtrack = document.getElementById("soundtrack");
        this.soundtrack.play();

        // Starts the game loop using setInterval(), which repeatedly executes the gameLoop() function at a frecuency of 60 times per second.
        this.gameLoop();
    }
    gameLoop() {
        if(this.gameIsOver) {
            return;
        }

        this.update();

        window.requestAnimationFrame(() => this.gameLoop()); // This helps provides the browsers animation frame repeadtedly and frequently changes the pictures too. 
    }
    update(){
        // this is the Lives ScoreBoard
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        // Call this function at the 'game.js' for the car to move in different position
        this.player.move();

        // iterate over the obstacles array and make them move
        for(let i=0; i<this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();

                this.obstacles.splice(i, 1);

                this.lives--;
            } else if (obstacle.top > this.height) {
                this.score++;
                
            }

            if(obstacle.top > this.height) {
                this.score++;

                // Remove the Obstacles HTML element from the HTML
                obstacle.element.remove();

                // Remove the Obstacles from the Game Class'obstables array
                this.obstacles.splice(i, 1);
            }
        }

        if ( this.lives === 0) {
            this.endGame();
        }
        
        // if there are no obstacles, push a new one after 1-seconds and half
        if(this.obstacles.length===0 && !this.isPushingObstacle) {
            this.isPushingObstacle = true;
            setTimeout(() => {
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.isPushingObstacle = false;
            }, 1500);
        }

        score.innerHTML = this.score;
        lives.innerHTML = this.lives;

    }

    endGame(){
        // Change the gameIsOver status, If it's true, remember that this is going to break the animation loop...
        this.gameIsOver = true;
        // Remove Player
        this.player.element.remove();

        // Remove all Obstacles
        this.obstacles.forEach((obstacle, index) => {
            // Remove the Obstacles from JS
            this.obstacles.splice(index, 1);
            // Remove the Obstacles from HTML
            obstacle.element.remove 
        });


        // Hide the current Game Screem...
        this.gameScreen.style.display = "none";

        // In order, to display the Game End Screen
        this.gameEndScreen.style.display = "block";


        // This is to set and display the scores from the game.
        const highestScore = localStorage.getItem("highestscore");

        if(this.score > highestScore && this.score > highestScore){
            localStorage.setItem("highestscore", this.score);
        }
    }
}