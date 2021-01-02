
export default function move_bishop(props) {
    const { rowFrom, colFrom } = props;
    const validMoves = new Array();
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);

    // toTopLeft line
    for (let i = col - 1; i != 0; i--) {
        const newRow = row - (col - i);

        if (newRow >= 1)
            validMoves.push(`${newRow}_${i}`)
    }

    // toTopRight line
    for (let j = col + 1; j != 9; j++) {
        const newRow = row + (col - j);

        if (newRow >= 1)
            validMoves.push(`${newRow}_${j}`)
    }

    // toBottomLeft
    for (let k = col - 1; k != 0; k--) {
        const newRow = row + (col - k);

        if (newRow <= 8)
            validMoves.push(`${newRow}_${k}`)
    }

    // toBottomRight
    for (let l = col + 1; l != 9; l++) {
        const newRow = row + (l - col);

        if (newRow <= 8)
            validMoves.push(`${newRow}_${l}`)
    }

    return validMoves;
}