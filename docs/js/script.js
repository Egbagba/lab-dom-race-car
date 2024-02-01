window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function() {
    // JS, In the current tab, is going to refresh (reload) the page or restart button....
    location.reload();
  });



  function startGame() {
    // console.log("start game");
    game = new Game();
    game.start();
  }

  // This is the option for pressing the game button keys from Left, Up, Right and Down using an array to arrange them.
  function handleKeydown(event){
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

    if(possibleKeys.includes(key)) {
      event.preventDefault();

      if(game){
        switch(key){
          case "ArrowLeft":
            game.player.directionX = -5; // If I want the car to move faster in the game I need to change the '1-5 or more. 
            break;
          case "ArrowUp":
            game.player.directionY = -5;
            break;
          case "ArrowRight":
            game.player.directionX = 5;
            break;
          case "ArrowDown":
            game.player.directionY = 5;    
        }
      }
    }
  }

  function handleKeyup(event){
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

    if(possibleKeys.includes(key)) {
      event.preventDefault();

      if(game){
        switch(key){
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
            game.player.directionY = 0;
            break;
          case "ArrowRight":
            game.player.directionX = 0;
            break;
          case "ArrowDown":
            game.player.directionY = 0;    
        }
      }
    }
  }
   // Using the addEventListener to operate every key button.
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
