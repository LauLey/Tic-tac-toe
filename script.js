const gameBoard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];

    const placeMark = (position, symbol) => {
        if (board[position] === null) {
            board[position] = symbol;
            return true;
        }

        else {
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
    if (gameOver===true) {
        return
    }
    else if (players.length < 2) {
    alert("Primero debes crear los dos jugadores");
    return;
    }
    else if (currentPlayerIndex===0) {
        const validMove = gameBoard.placeMark(position, players[currentPlayerIndex].symbol);
        if (validMove===true) {
            const playerWinner = gameBoard.winner();
            if (playerWinner !== ""){
                const nameWinnerObject = players.find(p => p.symbol === playerWinner);
                const nameWinner = nameWinnerObject.name;
                gameOver = true;
                alert (`Ganador del juego: ${nameWinner}`);
            }
            else if (gameBoard.isDraw()) {
                alert ("Es un empate");
                gameOver = true;
                return
            }            
            else currentPlayerIndex ++
        }
    }
    else { 
        const validMove = gameBoard.placeMark(position, players[currentPlayerIndex].symbol);
        if (validMove===true) {
            const playerWinner = gameBoard.winner();
            if (playerWinner !== ""){
                const nameWinnerObject = players.find(p => p.symbol === playerWinner);
                const nameWinner = nameWinnerObject.name;
                gameOver = true;
                alert (`Ganador del juego: ${nameWinner}`);
            }
            else if (gameBoard.isDraw()) {
                alert ("Es un empate");
                gameOver = true;
                return
            }       
            else currentPlayerIndex --
        }
    }

}
const resetController = () => {
    gameBoard.resetBoard();
    players.length = 0;
    symbol = "";
    currentPlayerIndex = 0;
    gameOver = false;
}

return {createPlayers, playTurn, resetController}
})();

