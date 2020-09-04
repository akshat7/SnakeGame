//variables
let gridSize = 100;
let gameFrame = document.createElement("div")
let boardUnitSize = 10;
let boardUnitList = []
let snake = []

let createBoard = () => {
    gameFrame.id = "game-frame"
    gameFrame.style.width = `${gridSize}px`
    gameFrame.style.height = `${gridSize}px`

    document.body.appendChild(gameFrame)

    for(let i=0; i<gridSize; i++){
        let boardUnit = document.createElement("div");

        boardUnit.className = "board-unit"
        boardUnit.id = `board-unit-${i+1}`
        
        boardUnit.style.width = `${boardUnitSize}px`
        boardUnit.style.height = `${boardUnitSize}px`

        gameFrame.appendChild(boardUnit);

        boardUnitList.push(boardUnit.id)
    }
    
}

createBoard()
// console.log(boardUnitList)
snake = boardUnitList.slice(0, 3)
for(let i=0; i<snake.length; i++){
    document.getElementById(snake[i]).classList.add("snake")
}
let index = snake.length
setInterval(() => {
    snake.push(boardUnitList[index]);
    index++;
    let x = snake.shift();
    document.getElementById(snake[snake.length-1]).classList.add("snake")
    document.getElementById(x).classList.remove("snake")
}, 500);