
export default function move_pawn(props) {
    const { MOVEMENTS, SELECTED_CELLID, SELECTED_PLAYER, rowFrom, colFrom } = props;
    const validMoves = new Array();

    const numForward = MOVEMENTS[SELECTED_CELLID] >= 1
        ? 1
        : 2

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

    return validMoves;
}