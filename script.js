const gameBoard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];

    const placeMark = (position, symbol) => {
        if (board[position] === null) {
            board[position] = symbol;
        }

        else {
            return "ERROR: Elige una casilla vacía";
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

        return { placeMark, winner };
})();