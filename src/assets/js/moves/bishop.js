import ChessApp from '../main';

export default function move_bishop(props) {
    const { rowFrom, colFrom } = props;
    const validMoves = new Array();
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);
    const currentPlayer = ChessApp.getCurrentPlayer();


    // toTopLeft line
    for (let i = col - 1; i != 0; i--) {
        const newRow = row - (col - i);
        const cell = document.querySelector(`[data-coor='${newRow}_${i}']`)

        // stop once a chess piece is present and belongs to the player
        if (cell && cell.id && cell.getAttribute('player') == currentPlayer)
            break;

        // stop once a chess piece is present, doesn't belong to player
        if (cell && cell.id && cell.getAttribute('player') != currentPlayer) {
            validMoves.push(`${newRow}_${i}`)
            break;
        }

        if (newRow >= 1)
            validMoves.push(`${newRow}_${i}`)
    }



    // toTopRight line
    for (let j = col + 1; j != 9; j++) {
        const newRow = row + (col - j);
        const cell = document.querySelector(`[data-coor='${newRow}_${j}']`)

        // stop once a chess piece is present and belongs to the player
        if (cell && cell.id && cell.getAttribute('player') == currentPlayer)
            break;

        // stop once a chess piece is present, doesn't belong to player
        if (cell && cell.id && cell.getAttribute('player') != currentPlayer) {
            validMoves.push(`${newRow}_${j}`)
            break;
        }

        if (newRow >= 1)
            validMoves.push(`${newRow}_${j}`)
    }



    // toBottomLeft
    for (let k = col - 1; k != 0; k--) {
        const newRow = row + (col - k);
        const cell = document.querySelector(`[data-coor='${newRow}_${k}']`)

        // stop once a chess piece is present and belongs to the player
        if (cell && cell.id && cell.getAttribute('player') == currentPlayer)
            break;

        // stop once a chess piece is present, doesn't belong to player
        if (cell && cell.id && cell.getAttribute('player') != currentPlayer) {
            validMoves.push(`${newRow}_${k}`)
            break;
        }

        if (newRow <= 8)
            validMoves.push(`${newRow}_${k}`)
    }



    // toBottomRight
    for (let l = col + 1; l != 9; l++) {
        const newRow = row + (l - col);
        const cell = document.querySelector(`[data-coor='${newRow}_${l}']`)

        // stop once a chess piece is present and belongs to the player
        if (cell && cell.id && cell.getAttribute('player') == currentPlayer)
            break;

        // stop once a chess piece is present, doesn't belong to player
        if (cell && cell.id && cell.getAttribute('player') != currentPlayer) {
            validMoves.push(`${newRow}_${l}`)
            break;
        }

        if (newRow <= 8)
            validMoves.push(`${newRow}_${l}`)
    }


    return validMoves;
}