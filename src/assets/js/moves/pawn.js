
export default function move_pawn(props) {
    const { MOVEMENTS, SELECTED_CELLID, SELECTED_PLAYER, rowFrom, colFrom } = props;
    const validMoves = new Array();
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);

    const numForward = MOVEMENTS[SELECTED_CELLID] >= 1
        ? 1
        : 2

    switch (true) {
        case SELECTED_PLAYER == 'BLK':
            for (let i = 1; i <= numForward; i++) {
                const forward = `[data-coor='${row + i}_${col}']`;
                const cellForward = document.querySelector(forward);

                if (cellForward && !cellForward.id)
                    validMoves.push(`${row + i}_${col}`)

                // left/right attack
                if (i == 1) {
                    const oneLeft = `[data-coor='${row + i}_${col - 1}']`;
                    const oneRight = `[data-coor='${row + i}_${col + 1}']`;
                    const cellOneLeft = document.querySelector(oneLeft);
                    const cellOneRight = document.querySelector(oneRight);

                    if (cellOneLeft
                        && cellOneLeft.id
                        && cellOneLeft.getAttribute('player') != SELECTED_PLAYER)
                        validMoves.push(cellOneLeft.getAttribute('data-coor'))

                    if (cellOneRight
                        && cellOneRight.id
                        && cellOneRight.getAttribute('player') != SELECTED_PLAYER)
                        validMoves.push(cellOneRight.getAttribute('data-coor'))
                }
            }
            break;



        case SELECTED_PLAYER == 'WHI':
            for (let i = 1; i <= numForward; i++) {
                const forward = `[data-coor='${row - i}_${col}']`;
                const cellForward = document.querySelector(forward);

                if (cellForward && !cellForward.id)
                    validMoves.push(`${row - i}_${col}`)

                // left/right attack
                if (i == 1) {
                    const oneLeft = `[data-coor='${row - i}_${col - 1}']`;
                    const oneRight = `[data-coor='${row - i}_${col + 1}']`;
                    const cellOneLeft = document.querySelector(oneLeft);
                    const cellOneRight = document.querySelector(oneRight);

                    if (cellOneLeft
                        && cellOneLeft.id
                        && cellOneLeft.getAttribute('player') != SELECTED_PLAYER)
                        validMoves.push(cellOneLeft.getAttribute('data-coor'))

                    if (cellOneRight
                        && cellOneRight.id
                        && cellOneRight.getAttribute('player') != SELECTED_PLAYER)
                        validMoves.push(cellOneRight.getAttribute('data-coor'))
                }
            }
            break;

    }

    return validMoves;
}