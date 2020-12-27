
//  ===============================================================
//  CHECK MOVEMENTS
//  ===============================================================

function isMoveValid(state, coorFrom, coorTo) {
    const { MOVEMENTS, SELECTED_PIECE, SELECTED_PLAYER,
        SELECTED_CELLID, SELECTED_VALIDMOVES } = state;
    const [rowFrom, colFrom] = coorFrom.split('_')
    const [rowTo, colTo] = coorTo.split('_')

    switch (SELECTED_PIECE) {


        // PAWN check if the move is valid
        case 'PA':
            const numForward = MOVEMENTS[SELECTED_CELLID] > 1 ? 1 : 2

            switch (true) {

                case SELECTED_PLAYER == 'BLK':
                    return rowTo > rowFrom
                        && rowTo - rowFrom <= numForward
                        && colTo == colFrom
                        ? isValidMove = true
                        : isValidMove = false;

                case SELECTED_PLAYER == 'WHI':
                    return rowTo < rowFrom
                        && rowFrom - rowTo <= numForward
                        && colTo == colFrom
                        ? isValidMove = true
                        : isValidMove = false;
            }
            break;



        // ROOK check if the move is valid
        case 'RO':
            return rowTo == rowFrom || colTo == colFrom



        // KNIGHT check if the move is valid
        case 'KN':
            const cell = document.querySelector(`[data-coor='${coorTo}']`)
            const owner = cell.getAttribute('player');

            if (owner && owner == SELECTED_PLAYER)
                return false

            return SELECTED_VALIDMOVES.some(coor => coorTo == coor);
    }


}













//  ===============================================================
//  GENERATE VALID MOVEMENTS
//  ===============================================================

function generateValidMoves(state) {
    const { MOVEMENTS, SELECTED_PIECE, SELECTED_PLAYER, SELECTED_CELLID, SELECTED_COOR } = state;
    const [rowFrom, colFrom] = SELECTED_COOR.split('_')
    const numForward = MOVEMENTS[SELECTED_CELLID] >= 1 ? 1 : 2
    const validMoves = new Array();

    switch (SELECTED_PIECE) {


        // PAWN generate valid moves
        case 'PA':
            switch (true) {
                case SELECTED_PLAYER == 'BLK':
                    for (let i = 1; i <= numForward; i++) {
                        validMoves.push(`${parseInt(rowFrom) + i}_${colFrom}`)
                    }
                    break;
                case SELECTED_PLAYER == 'WHI':
                    for (let i = 1; i <= numForward; i++) {
                        validMoves.push(`${parseInt(rowFrom) - i}_${colFrom}`)
                    }
                    break;
            }

            break;


        // ROOK generate valid moves
        case 'RO':
            const currentCoor = [rowFrom, colFrom];

            currentCoor.forEach((coor, ind) => {

                for (let i = 1; i <= 8; i++) {

                    if (ind == 0 && `${coor}_${i}` != `${rowFrom}_${colFrom}`) {
                        validMoves.push(`${coor}_${i}`)
                    }

                    if (ind == 1 && `${i}_${coor}` != `${rowFrom}_${colFrom}`) {
                        validMoves.push(`${i}_${coor}`)
                    }
                }

            })

            break;


        // KNIGHT generate valid moves
        case 'KN':

            // 2 cells away all directions
            const up = parseInt(rowFrom) - 2
            const down = parseInt(rowFrom) + 2
            const left = parseInt(colFrom) - 2
            const right = parseInt(colFrom) + 2

            // left/right of that direction (up/down = row, left/right = col)
            if (up && up > 0) {
                const onItsRight = parseInt(colFrom) + 1;
                const onItsLeft = parseInt(colFrom) - 1;
                onItsRight > 0 ? validMoves.push(`${up}_${onItsRight}`) : null;
                onItsLeft > 0 ? validMoves.push(`${up}_${onItsLeft}`) : null;
            }

            if (down && down > 0 && down <= 8) {
                const onItsRight = parseInt(colFrom) + 1;
                const onItsLeft = parseInt(colFrom) - 1;
                onItsRight > 0 ? validMoves.push(`${down}_${onItsRight}`) : null;
                onItsLeft > 0 ? validMoves.push(`${down}_${onItsLeft}`) : null;
            }

            if (left && left > 0) {
                const onItsTop = parseInt(rowFrom) - 1;
                const onItsBottom = parseInt(rowFrom) + 1;
                onItsTop > 0 ? validMoves.push(`${onItsTop}_${left}`) : null;
                onItsBottom > 0 && onItsBottom <= 8
                    ? validMoves.push(`${onItsBottom}_${left}`)
                    : null;
            }

            if (right && right > 0 && right <= 8) {
                const onItsTop = parseInt(rowFrom) - 1;
                const onItsBottom = parseInt(rowFrom) + 1;
                onItsTop > 0 ? validMoves.push(`${onItsTop}_${right}`) : null;
                onItsBottom > 0 && onItsBottom <= 8
                    ? validMoves.push(`${onItsBottom}_${right}`)
                    : null;
            }

            break;
    }

    return validMoves;
}


















//  ===============================================================
//  MODELS
//  ===============================================================
function HTMLChessPieceCell(row, col, player, piece) {
    this.container = document.createElement('div');
    this.container.classList.add('col');
    this.container.classList.add(player);
    this.container.setAttribute('data-coor', `${row}_${col}`);
    this.container.setAttribute('player', player);
    this.container.setAttribute('piece', piece);
    this.container.setAttribute('id', `${piece}_${player}_${Math.random().toString().substr(2, 20)}`);
    this.container.textContent = piece;
    shouldDarken(row, col)
        ? this.container.classList.add('dark')
        : null
}

function HTMLChessPieceCellEmpty(row, col) {
    this.container = document.createElement('div');
    this.container.setAttribute('data-coor', `${row}_${col}`);
    this.container.classList.add('col');
    shouldDarken(row, col)
        ? this.container.classList.add('dark')
        : null
}












//  ===============================================================
//  UTILITIES
//  ===============================================================
function shouldDarken(row, col) {

    // row is even, but col is odd  OR
    // row is odd,  but col is even

    return row % 2 == 0 && col % 2 != 0
        || row % 2 != 0 && col % 2 == 0
        ? true
        : false
}

function showValidMoves(state, status) {
    const { SELECTED_VALIDMOVES, SELECTED_PLAYER } = state;

    switch (status.toLowerCase()) {
        case 'deactivate':
            SELECTED_VALIDMOVES.forEach(coor => {
                const cell = document.querySelector(`[data-coor='${coor}']`)
                cell.classList.remove('validmove');
            })
            break;

        case 'activate':
            SELECTED_VALIDMOVES.forEach(coor => {
                const cell = document.querySelector(`[data-coor='${coor}']`)
                const owner = cell.getAttribute('player');

                if (!owner || owner != SELECTED_PLAYER)
                    cell.classList.add('validmove');

            })
            break;
    }
}