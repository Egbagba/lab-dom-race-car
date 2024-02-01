class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        // gameScreen HTML element
        this.gameScreen = gameScreen;

        // Position Values
        this.left = left;
        this.top = top;

        // Player Dimension Values
        this.width = width;
        this.height = height;

        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        // this is direction for directing the car by the User.
        this.directionX = 0;
        this.directionY = 0;

        this.gameScreen.appendChild(this.element);
    }
       // Here is basically for the moves 
    move(){
        this.left += this.directionX;
        this.top += this.directionY;

        // This means the Car will not move beyond the Right border of the gameScreen when avoiding obstacles..
        if(this.left + this.width > this.gameScreen.offsetWidth){
            this.left = this.gameScreen.offsetWidth - this.width;
        }

        // This same is applicable to the Left side of the gameScreen when 
        else if(this.left <= 0){
            this.left = 0;
        }

        // This handle the Bottom side of the Game screen, So the car also stops at the Bottom Border.
        if (this.top + this.height > this.gameScreen.offsetHeight) {
            this.top = this.gameScreen.offsetHeight - this.height;
        }

        // This handle the Top side of the Game screen, So the car also stops at the Top Border.
        else if(this.top <= 0) {
            this.top = 0;
        }


        // the UpdatePosition function should be call back inside the moves functions
        this.updatePosition();
    }

    // Update function for the game through the CSS.style.
    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
    // This is like getting hit or Collide with the obstacles from both sides
    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if(
            playerRect.left < obstacleRect.right && 
            playerRect.right > obstacleRect.left && 
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top 
        ) {
            return true;
        } else {
            return false;
        }
    }
}   