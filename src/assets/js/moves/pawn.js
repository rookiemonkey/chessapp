
export default function move_pawn(props) {
    const { MOVEMENTS, SELECTED_CELLID, SELECTED_PLAYER, rowFrom, colFrom } = props;
    const validMovesPawn = new Array();
    const validEnpassants = new Array();
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
                    validMovesPawn.push(`${row + i}_${col}`)

                // left/right attack with en passant
                if (i == 1) {
                    const oneLeft = `[data-coor='${row + i}_${col - 1}']`;
                    const oneRight = `[data-coor='${row + i}_${col + 1}']`;
                    const enpassantLeft = `[data-coor='${row}_${col - 1}']`;
                    const enpassantRight = `[data-coor='${row}_${col + 1}']`;
                    const cellOneLeft = document.querySelector(oneLeft);
                    const cellOneRight = document.querySelector(oneRight);
                    const cellEnpassantLeft = document.querySelector(enpassantLeft);
                    const cellEnpassantRight = document.querySelector(enpassantRight);

                    // check if these possible enpassants moves have moved once already
                    // get the cell below the target piece
                    if (cellEnpassantLeft
                        && cellEnpassantLeft.getAttribute('player') != SELECTED_PLAYER
                        && MOVEMENTS[cellEnpassantLeft.getAttribute('id')] == 1) {
                        const coor = cellEnpassantLeft.getAttribute('data-coor')
                        const [x, y] = coor.split('_');
                        validMovesPawn.push(`${parseInt(x) + 1}_${y}`);
                        validEnpassants.push(coor)
                    }

                    if (cellEnpassantRight
                        && cellEnpassantRight.getAttribute('player') != SELECTED_PLAYER
                        && MOVEMENTS[cellEnpassantRight.getAttribute('id')] == 1) {
                        const coor = cellEnpassantRight.getAttribute('data-coor')
                        const [x, y] = coor.split('_');
                        validMovesPawn.push(`${parseInt(x) + 1}_${y}`);
                        validEnpassants.push(coor)
                    }

                    if (cellOneLeft
                        && cellOneLeft.id
                        && cellOneLeft.getAttribute('player') != SELECTED_PLAYER)
                        validMovesPawn.push(cellOneLeft.getAttribute('data-coor'))

                    if (cellOneRight
                        && cellOneRight.id
                        && cellOneRight.getAttribute('player') != SELECTED_PLAYER)
                        validMovesPawn.push(cellOneRight.getAttribute('data-coor'))
                }
            }
            break;



        case SELECTED_PLAYER == 'WHI':
            for (let i = 1; i <= numForward; i++) {
                const forward = `[data-coor='${row - i}_${col}']`;
                const cellForward = document.querySelector(forward);

                if (cellForward && !cellForward.id)
                    validMovesPawn.push(`${row - i}_${col}`)

                // left/right attack with en passant
                if (i == 1) {
                    const oneLeft = `[data-coor='${row - i}_${col - 1}']`;
                    const oneRight = `[data-coor='${row - i}_${col + 1}']`;
                    const enpassantLeft = `[data-coor='${row}_${col - 1}']`;
                    const enpassantRight = `[data-coor='${row}_${col + 1}']`;
                    const cellOneLeft = document.querySelector(oneLeft);
                    const cellOneRight = document.querySelector(oneRight);
                    const cellEnpassantLeft = document.querySelector(enpassantLeft);
                    const cellEnpassantRight = document.querySelector(enpassantRight);

                    // check if these possible enpassants moves have moved once already
                    // get the cell above the target piece
                    if (cellEnpassantLeft
                        && cellEnpassantLeft.getAttribute('player') != SELECTED_PLAYER
                        && MOVEMENTS[cellEnpassantLeft.getAttribute('id')] == 1) {
                        const coor = cellEnpassantLeft.getAttribute('data-coor')
                        const [x, y] = coor.split('_');
                        validMovesPawn.push(`${parseInt(x) - 1}_${y}`);
                        validEnpassants.push(coor);
                    }

                    if (cellEnpassantRight
                        && cellEnpassantRight.getAttribute('player') != SELECTED_PLAYER
                        && MOVEMENTS[cellEnpassantRight.getAttribute('id')] == 1) {
                        const coor = cellEnpassantRight.getAttribute('data-coor')
                        const [x, y] = coor.split('_');
                        validMovesPawn.push(`${parseInt(x) - 1}_${y}`);
                        validEnpassants.push(coor);
                    }

                    if (cellOneLeft
                        && cellOneLeft.id
                        && cellOneLeft.getAttribute('player') != SELECTED_PLAYER)
                        validMovesPawn.push(cellOneLeft.getAttribute('data-coor'))

                    if (cellOneRight
                        && cellOneRight.id
                        && cellOneRight.getAttribute('player') != SELECTED_PLAYER)
                        validMovesPawn.push(cellOneRight.getAttribute('data-coor'))
                }
            }
            break;

    }

    return { validMovesPawn, validEnpassants };
}