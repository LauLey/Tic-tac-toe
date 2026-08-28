gameBoard {
    const tablero = [null, null, null, null, null, null, null, null, null];

    function placeMark (position, symbol) {
        if (tablero[position]===null) {
            tablero[position]=symbol;
        }

        else {
            return "ERROR: Elige una casilla vacía";
            }
    }
}



playgame ({

})()