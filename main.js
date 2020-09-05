//variables
let gridSize = 200;
let gameFrame = document.createElement("div");
let boardUnitSize = 10;
let unitMeasure = gridSize / boardUnitSize;
let boardUnitList = [];
let snake = [];
let speed = 0.9;
let timer = 500;
let moveRight = 1;
let moveLeft = -1;
let moveDown = unitMeasure;
let moveUp = -unitMeasure;
let previousDirection = moveRight;
let direction = moveRight;
let snakeLength = 4;
let snakeHead = snakeLength;
let snakeTail = 0;
let foodLocation = 0;
let timerID;
let playerScore = 0;
let scoreTag;

let createBoard = () => {
    gameFrame.id = "game-frame";
    gameFrame.style.width = `${gridSize}px`;
    gameFrame.style.height = `${gridSize}px`;

    if (document.getElementById("game-frame")) {
        document.body.removeChild(gameFrame);
    }

    document.body.appendChild(gameFrame);

    for (let i = 0; i < unitMeasure * unitMeasure; i++) {
        let boardUnit = document.createElement("div");

        boardUnit.className = "board-unit";
        boardUnit.id = `board-unit-${i + 1}`;

        boardUnit.style.width = `${boardUnitSize}px`;
        boardUnit.style.height = `${boardUnitSize}px`;

        gameFrame.appendChild(boardUnit);

        boardUnitList.push(i + 1);
    }
};

let createSnake = () => {
    snake = boardUnitList.slice(0, snakeLength);
    for (let i = 0; i < snake.length; i++) {
        document
            .getElementById(`board-unit-${snake[i]}`)
            .classList.add("snake");
    }
};

let spawnFood = () => {
    do {
        foodLocation = parseInt(Math.random() * gridSize);
    } while (snake.includes(foodLocation));
    document.getElementById(`board-unit-${foodLocation}`).classList.add("food");
};

let snakeAteFood = () => {
    return snakeHead === foodLocation;
};

let snakeMovingOpposite = () => {
    return previousDirection === -direction;
};

let isValid = () => {
    //console.log(snake, snakeHead, direction)
    if (
        snakeHead + direction >= boardUnitList.length ||
        snakeHead + direction < 0
    ) {
        return false;
    }
    if (snakeHead % unitMeasure === 1 && direction === moveLeft) {
        return false;
    }
    if (snakeHead % unitMeasure === 0 && direction === moveRight) {
        return false;
    }
    if (snake.includes(snakeHead + direction) && !snakeMovingOpposite()) {
        return false;
    }
    return true;
};

let playGame = () => {
    // console.log(snake, snakeHead)
    if (isValid()) {
        if (snakeMovingOpposite()) {
            direction = previousDirection;
        } else {
            previousDirection = direction;
        }
        snake.push(snakeHead + direction);
        //console.log(snake, snakeHead, direction)
        snakeHead = snake[snake.length - 1];
        //console.log(snake, snakeHead, direction)
        snakeTail = snake.shift();
        document
            .getElementById(`board-unit-${snakeTail}`)
            .classList.remove("snake");
        document
            .getElementById(`board-unit-${snake[snake.length - 1]}`)
            .classList.add("snake");
    } else {
        clearInterval(timerID);
        result = document.createElement("h1");
        result.textContent = "Game Over!";

        document.body.appendChild(result);
        document
            .getElementById(`board-unit-${snakeHead}`)
            .classList.add("snakeDead");

        document.body.appendChild(restartButton);
        document.getElementById("restart-game").style.display = "block";
    }
    if (snakeAteFood()) {
        playerScore++;
        scoreTag.textContent = `Score: ${playerScore}`;
        snakeLength += 1;
        snake.unshift(snakeTail);
        document
            .getElementById(`board-unit-${boardUnitList[snake[0] - 1]}`)
            .classList.add("snake");
        document
            .getElementById(`board-unit-${foodLocation}`)
            .classList.remove("food");
        spawnFood();
        console.log(timer, speed);
        clearInterval(timerID);
        timer = timer * speed;
        timerID = setInterval(playGame, timer);
    }
};

let startButton = document.getElementById("start-game");

startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    createBoard();
    createSnake();
    spawnFood();

    scoreTag = document.createElement("h1");
    scoreTag.textContent = `Score: ${playerScore}`;
    document.body.appendChild(scoreTag);

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 37) {
            direction = moveLeft;
        } else if (event.keyCode === 38) {
            direction = moveUp;
        } else if (event.keyCode === 39) {
            direction = moveRight;
        } else if (event.keyCode === 40) {
            direction = moveDown;
        }
    });
    timerID = setInterval(playGame, timer);
});

let restartButton = document.createElement("button");
restartButton.textContent = "Restart Game!";
restartButton.id = "restart-game";
restartButton.addEventListener("click", function () {
    window.location.reload();
});
