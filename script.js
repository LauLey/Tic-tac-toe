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

    return { placeMark };
})();

