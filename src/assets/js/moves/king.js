
export default function move_king(props) {
    const { rowFrom, colFrom } = props;
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);
    const moves = new Array();
    const validMoves = new Array();

    const oneTop = `${row - 1}_${col}`
    const oneBottom = `${row + 1}_${col}`
    const oneLeft = `${row}_${col - 1}`
    const oneRight = `${row}_${col + 1}`
    const topLeft = `${row - 1}_${col - 1}`
    const topRight = `${row - 1}_${col + 1}`
    const bottomLeft = `${row + 1}_${col - 1}`
    const bottomRight = `${row + 1}_${col + 1}`

    moves.push(oneTop, oneBottom, oneLeft,
        oneRight, topLeft, topRight,
        bottomLeft, bottomRight)

    moves.forEach(move => {
        const [x, y] = move.split('_');
        console.log({ x, y })
        if ((x > 0 && x <= 8) && (y > 0 && y <= 8))
            validMoves.push(move)
    })

    return validMoves;
}