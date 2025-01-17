const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let placeholder = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let gameRunning = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent =  `${currentPlayer}'s turn`;
    gameRunning = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (placeholder[cellIndex] != "" || !gameRunning) {
        return; // then do nothing
    }
    // otherwise, if cell IS in fact empty & game is still running,
    // update cell and check for winner each time
    updateCell(this, cellIndex);
    //changePlayer();
    checkWinner();
}

function updateCell(cell, index) {
    placeholder[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent =  `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningCombo.length; i++) {
        const condition = winningCombo[i];
        const cellA = placeholder[condition[0]]; // access the cell using the index from condition
        const cellB = placeholder[condition[1]];
        const cellC = placeholder[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue; //if the cells for the winning combo are empty, continue
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true; // if the winning combo cells contain same value (character of current player), they win
            winningCells = condition; // save winning cells indices
            break;
        }
    }
    if (roundWon) {
        statusText.textContent =  `${currentPlayer} won!`;
        gameRunning = false; //if winning combo is found, game stops
    
        // disable hover effect after a win
        document.querySelector("#cellContainer").classList.add("no-hover");
        // highlight the winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('highlight');
        });
    }
    else if (!placeholder.includes("")) {
        statusText.textContent =  `Draw!`;
        gameRunning = false; // if board is full but no one has won, game stops
    }
    else {
        changePlayer(); // if no one has won yet and the game is still running, simply switch to next player
    }
}

function restartGame() {
    placeholder = ["", "", "", "", "", "", "", "", "",]; //reset game board
    //cells.forEach(cell => cell.textContent = ""); //clear cell contents

    cells.forEach(cell => {
        cell.textContent = ""; // clear the cell text
        cell.classList.remove('highlight'); // remove any highlight 
    });

    currentPlayer = "X";
    gameRunning = true;

    statusText.textContent =  `${currentPlayer}'s turn`;

    // Re-enable hover effect by removing 'no-hover' class
    document.querySelector("#cellContainer").classList.remove("no-hover");
}