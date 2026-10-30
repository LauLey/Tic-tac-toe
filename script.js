const gameBoard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];

    const placeMark = (position, symbol) => {
        if (board[position] === null) {
            board[position] = symbol;
            return true;
        }

        else {
            alert ("Elige una casilla vacía")
            return false;
        }
    };

    const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    const winner = () => {
        let playerWinner = "";
        winningCombinations.forEach((combination) => {
            if ((board[combination[0]]==="X") && (board[combination[1]]==="X") && (board[combination[2]]==="X")){
            playerWinner = "X";
            }
            else if ((board[combination[0]]==="O") && (board[combination[1]]==="O") && (board[combination[2]]==="O")){
            playerWinner = "O";
            }
            })

            return playerWinner;
        }

        const getMark = (position) => board[position];
        const isDraw = () => board.every(position => position !== null);
        const resetBoard = () => board.fill(null);

        return { placeMark, winner, getMark, isDraw, resetBoard};
})();


const gameController = (() => {
const players = [];
let symbol = "";
let currentPlayerIndex = 0;
let gameOver = false;
function createPlayers() {

if (players.length === 2) {
alert("Jugadores completos");
return;
}

else if (players.length=== 1) {
if (players[0].symbol==="X") {
symbol = "O"
}
else symbol = "X"
}

const name = prompt("Escribe tu nombre");

if (!name || !name.trim()) {
alert("Nombre inválido");
return;
}

const cleanName = name.trim();

alert("Hola, " + cleanName + ". ¡Bienvenido!");

if (symbol==="") {
while ((symbol!=="O") && (symbol!=="X")){
symbol = prompt("Elige tu marca de juego: X|O")
if (!symbol) {
alert  ("No elegiste símbolo, creación de jugador cancelada")
return
}
else {
symbol= symbol.toUpperCase()
}
}
}

const numPlayer = players.length +1
const player = { numPlayer, name: cleanName, symbol };

players.push(player)

return player;
}

function playTurn (position) {
    let validMove = false;
    if (gameOver===true) {
        return
    }
    else if (players.length < 2) {
    alert("Primero debes crear los dos jugadores");
    return;
    }
    else if (currentPlayerIndex===0) {
        validMove = gameBoard.placeMark(position, players[currentPlayerIndex].symbol);
        if (validMove===true) {
            const playerWinner = gameBoard.winner();
            if (playerWinner !== ""){
                gameOver = true;
                return playerWinner;
            }
            else if (gameBoard.isDraw()) {
                gameOver = true;
                return "isDraw";
            }            
            else currentPlayerIndex ++
        }
    }
    else { 
        validMove = gameBoard.placeMark(position, players[currentPlayerIndex].symbol);
        if (validMove===true) {
            const playerWinner = gameBoard.winner();
            if (playerWinner !== ""){
                gameOver = true;
                return playerWinner;
            }
            else if (gameBoard.isDraw()) {
                gameOver = true;
                return "isDraw";
            }       
            else currentPlayerIndex --
        }
    }

    return validMove;

}
const resetController = () => {
    gameBoard.resetBoard();
    players.length = 0;
    symbol = "";
    currentPlayerIndex = 0;
    gameOver = false;
}

const getCurrentSymbol = () => {
    return players[currentPlayerIndex].symbol;
}

const nameWinner = (symbol) => {
const nameWinnerObject =players.find(p => p.symbol === symbol);
const winnerName = nameWinnerObject.name;
return winnerName;
}

return {createPlayers, playTurn, resetController, getCurrentSymbol, nameWinner}
})();

const resetButton = document.querySelector("#reset");
const board = document.querySelector("#board");
const createButton = document.querySelector("#createPlayers");
const turn = document.querySelector("#turn");
const players = document.querySelector(".players");

resetButton.addEventListener("click", () => {
    gameController.resetController();
    const marks = board.querySelectorAll(".mark");
    marks.forEach(mark => {
        mark.remove();
    })

    const pP = players.querySelectorAll(".player1 p, .player2 p, .symbol1 p, .symbol2 p");
        pP.forEach(p => {
            p.remove();
        })
})

createButton.addEventListener("click", () => {
    const player1 = document.querySelector(".player1");
    const symbol1 = document.querySelector(".symbol1");
    const player2 = document.querySelector(".player2");
    const symbol2 = document.querySelector(".symbol2");
    const pName1 = document.createElement("p");
    const pName2 = document.createElement("p");
    const pSymbol1 = document.createElement("p");
    const pSymbol2 = document.createElement("p");
    const player = gameController.createPlayers("p");
        if (player.numPlayer===1) {
            pName1.textContent = player.name;
            pName1.classList.add("player1");
            player1.appendChild(pName1);
            pSymbol1.textContent = player.symbol;
            symbol1.appendChild(pSymbol1);
        }
        else {
            pName2.textContent = player.name;
            pName2.classList.add("player2");
            player2.appendChild(pName2);
            pSymbol2.textContent = player.symbol;
            symbol2.appendChild(pSymbol2);
        }

})

board.addEventListener("click", (e) => {
    const p = document.createElement("p");
    p.textContent = gameController.getCurrentSymbol();
    p.classList.add("mark");
        if (p.textContent==="X") {
            p.classList.add("symbolX");
        }
        else p.classList.add("symbolO");
    const square = (e.target.closest(".square"));
    const squareId = parseInt(square.id);
    let queryMark = gameController.playTurn(squareId);
    console.log("Resultado de playTurn:", queryMark);
        if (queryMark===true) {
            square.appendChild(p);
        }
        else if (queryMark==="X" || queryMark==="O") {
            square.appendChild(p);
            setTimeout(() => {
            alert("Ganador es " + gameController.nameWinner(queryMark));
            }, 0);
        }

        else if (queryMark==="isDraw") {
            square.appendChild(p);
            setTimeout(() => {
            alert("Es un empate");
            }, 0);
        }
        

        else return

})