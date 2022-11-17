//game board - will be one array of active cells and a boarder of blocked cells that will cause the game to end.
// I need a function that moves the snake at a set interval moving it by adding the new TD index to the front based on 
// selected direction and setting the class of that TD to be snake and poping off the last index in the snake and removing the
// class name
// If the cell the snake moves to is: 
//clear - ok to proceed
// apple - add to score and add another head?
// snake - Game over
// boarder - Game over

// need a tracker to see which direction key is selected. 

// if up move to the TD up from where it is or -32
// if down move to the TD down from where it is or +32
// if right move to the right or +1
// if left move to the left or -1

// I also need to add a function that randomizes a TD from the board to have an apple for the snake to eat - if 
// it chooses a random cell that has a class = blocked it needs to pick another

// gB short for game board
const gB = document.getElementsByTagName("td");
let snake = [gB[987], gB[988], gB[989], gB[990]];
const startingSnake = [gB[987], gB[988], gB[989], gB[990]];
let apple = gB[312];       
apple.className = "apple";

const easySpeed = 110;
const mediumSpeed = 75;
const hardSpeed = 50;
const veryHardSpeed = 25;
let speed = easySpeed;

let scoreHistory = [0];

let playerName = "";

document.getElementById("submitButton").onclick = function(){ 
    playerName = document.getElementById("enterName").value;
}

startingSnake[0].className = "snake";
startingSnake[1].className = "snake";
startingSnake[2].className = "snake";
startingSnake[3].className = "snake";

const left = -1;
const right = 1;
const up = -32;
const down = 32;

const startingSnakeHeadIndex = 987;
let x = startingSnakeHeadIndex; 
let score = 0;
let direction = left;


function keyTrack(event){
    if(event.key === "ArrowLeft"){
        if (direction !== right){
            direction = left;
        }
    }
    if(event.key === "ArrowRight"){ 
        if (direction !== left) {
            direction = right;
        }
    }
    if(event.key === "ArrowUp"){ 
        if (direction !== down) {
            direction = up;
        }
    }
    if(event.key === "ArrowDown"){
        if (direction !== up){
            direction = down;
        }
    }
}
let scoreTracker = document.getElementById("score");

let startButton = document.getElementById("start");
startButton.addEventListener("click", event => {startGame()});

function startGame(){
    resetGame();
    const snakeMovement = setInterval(moveSnake, speed);
    function moveSnake(){
        document.addEventListener("keydown", event => {keyTrack(event)}); 
        x = x += direction;
        let nextCell = gB[x];
        if (nextCell.className !== "boarder" && nextCell.className !== "snake"){
            let newHead = nextCell;
            snake.unshift(newHead);
            if (newHead.className !== "apple"){
                newHead.className = "snake";
                let removeTail = snake[snake.length - 1];
                removeTail.className = "";
                removeTail = snake.splice(snake.length - 1, 1);
            } else {
                newHead.className = "snake";
                score = score += 1;
                scoreTracker.innerText = "Score: " + score;
            }
        } else {  
            let bluntForceTrauma = snake[0];
            bluntForceTrauma.className = "ouch";
            clearInterval(snakeMovement);     
            startButton.innerText = "Play Again";
            highScore = Math.max(...scoreHistory);
            scoreTracker.innerText = "Score: " + score;
            compareScores(score, highScore);
            scoreHistory.push(score);
            console.log(scoreHistory);
        }
    }
}


function resetGame() {
    for (i=0; i<gB.length; i++){
        if (gB[i].className === "snake" || gB[i].className === "ouch" || gB[i].className === "apple")
        gB[i].className = "";
        apple = gB[312];      
        snake = [gB[987], gB[988], gB[989], gB[990]];
        score = 0;     
        scoreTracker.innerText = "Score: " + score;
        direction = left;
        apple.className = "apple";
        x = startingSnakeHeadIndex; 
        startingSnake[0].className = "snake";
        startingSnake[1].className = "snake";
        startingSnake[2].className = "snake";
        startingSnake[3].className = "snake";
        message.innerText = "";
    }
}
let getApple = setInterval(randomizeApple, 50);

function randomizeApple() {
    if (apple.className !== "apple"){
        let a = Math.floor(Math.random() * gB.length);
        if (gB[a].className !== "boarder" && gB[a].className !== "snake"){
            apple = gB[a];
            apple.className = "apple";
        }
    }
}

let message = document.getElementById("message");

function compareScores(playerScore, highestScore){
    if (score > highScore){
        message.innerText =  playerName + "\n Your score is " + score + ". \nYou have the new high score!";
    } else if (score === highScore){
        message.innerText = playerName + "\n Your score is " + score + ". \n You tied your high score!";
    } else {
        message.innerText = playerName + "\n Your score is " + score + ". \nYour highest score is " + highScore;
    }
}

let selectSpeed = document.getElementById("difficultyLevel");

selectSpeed.addEventListener('change', event => {gameSpeed()});

function gameSpeed(){
    if(selectSpeed.value === "easy"){
        speed = easySpeed;
    } else if (selectSpeed.value === "medium") {
        speed = mediumSpeed;
    } else if (selectSpeed.value === "hard") {
        speed = hardSpeed;
    } else if (selectSpeed.value === "veryHard") {
        speed = veryHardSpeed;
    }
}
