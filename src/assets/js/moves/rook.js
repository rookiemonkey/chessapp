export default function move_rook(props) {
    const { rowFrom, colFrom } = props;
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);
    const validMoves = new Array();
    const oneRowUp = row - 1;
    const oneRowDown = row + 1;
    const oneColLeft = col - 1;
    const oneColRight = col + 1;

    // ROW loop from one-row up to 1
    if (oneRowUp >= 1) {
        for (let r = oneRowUp; r >= 1; r--) {
            const cell = document.querySelector(`[data-coor='${r}_${colFrom}']`)

            // stop once a chess piece is present
            if (cell.id)
                break;

            validMoves.push(cell.getAttribute('data-coor'))
        }
    }

    // ROW loop from one-row down to 8
    if (oneRowDown <= 8) {
        for (let j = oneRowDown; j <= 8; j++) {
            const cell = document.querySelector(`[data-coor='${j}_${colFrom}']`)

            if (cell.id)
                break; // stop once a chess piece is present

            validMoves.push(cell.getAttribute('data-coor'))
        }
    }


    // COL loop from one-col left to 1
    if (oneColLeft >= 1) {
        for (let k = oneColLeft; k >= 1; k--) {
            const cell = document.querySelector(`[data-coor='${rowFrom}_${k}']`)

            if (cell.id)
                break; // stop once a chess piece is present

            validMoves.push(cell.getAttribute('data-coor'))
        }
    }


    // COL loop from one-col right to 8
    if (oneColLeft <= 8) {
        for (let l = oneColRight; l <= 8; l++) {
            const cell = document.querySelector(`[data-coor='${rowFrom}_${l}']`)

            if (cell.id)
                break; // stop once a chess piece is present

            validMoves.push(cell.getAttribute('data-coor'))
        }
    }

    return validMoves;
}