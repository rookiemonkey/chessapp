
export default function isMoveValid(state, coorFrom, coorTo) {
    const { MOVEMENTS, SELECTED_PIECE, SELECTED_PLAYER,
        SELECTED_CELLID, SELECTED_VALIDMOVES } = state;
    const [rowFrom, colFrom] = coorFrom.split('_')
    const [rowTo, colTo] = coorTo.split('_')
    const cell = document.querySelector(`[data-coor='${coorTo}']`)
    const owner = cell.getAttribute('player');

    if (owner && owner == SELECTED_PLAYER)
        return false

    switch (SELECTED_PIECE) {


        // PAWN check if the move is valid
        case 'PA':
            const numForward = MOVEMENTS[SELECTED_CELLID] >= 1 ? 1 : 2

            switch (true) {

                case SELECTED_PLAYER == 'BLK':
                    return rowTo > rowFrom
                        && rowTo - rowFrom <= numForward
                        && colTo == colFrom
                        ? true
                        : false;

                case SELECTED_PLAYER == 'WHI':
                    return rowTo < rowFrom
                        && rowFrom - rowTo <= numForward
                        && colTo == colFrom
                        ? true
                        : false;
            }
            break;



        // ROOK check if the move is valid
        case 'RO':
            return rowTo == rowFrom || colTo == colFrom



        // KNIGHT check if the move is valid
        case 'KN':

            return SELECTED_VALIDMOVES.some(validCoor => coorTo == validCoor);



        // BISHOP check if the move is valid
        case 'BI':

            return SELECTED_VALIDMOVES.some(validCoor => coorTo == validCoor);



        // KING check if the move is valid
        case 'KI':
            return SELECTED_VALIDMOVES.some(validCoor => coorTo == validCoor)



        // QUEEN check if the move is valid
        case 'QU':
            return SELECTED_VALIDMOVES.some(validCoor => coorTo == validCoor)
    }

}