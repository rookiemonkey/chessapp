
export default function move_knight(props) {
    const { rowFrom, colFrom } = props;
    const validMoves = new Array();
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);
    const up = row - 2
    const down = row + 2
    const left = col - 2
    const right = col + 2

    if (up && up > 0) {
        const onItsRight = col + 1;
        const onItsLeft = col - 1;
        onItsRight > 0 ? validMoves.push(`${up}_${onItsRight}`) : null;
        onItsLeft > 0 ? validMoves.push(`${up}_${onItsLeft}`) : null;
    }

    if (down && down > 0 && down <= 8) {
        const onItsRight = col + 1;
        const onItsLeft = col - 1;
        onItsRight > 0 ? validMoves.push(`${down}_${onItsRight}`) : null;
        onItsLeft > 0 ? validMoves.push(`${down}_${onItsLeft}`) : null;
    }

    if (left && left > 0) {
        const onItsTop = row - 1;
        const onItsBottom = row + 1;
        onItsTop > 0 ? validMoves.push(`${onItsTop}_${left}`) : null;
        onItsBottom > 0 && onItsBottom <= 8
            ? validMoves.push(`${onItsBottom}_${left}`)
            : null;
    }

    if (right && right > 0 && right <= 8) {
        const onItsTop = row - 1;
        const onItsBottom = row + 1;
        onItsTop > 0 ? validMoves.push(`${onItsTop}_${right}`) : null;
        onItsBottom > 0 && onItsBottom <= 8
            ? validMoves.push(`${onItsBottom}_${right}`)
            : null;
    }

    return validMoves;
}