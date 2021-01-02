import move_pawn from './pawn';
import move_rook from './rook';
import move_knight from './knight';
import move_bishop from './bishop';

export default function getValidMoves(state) {
    const { SELECTED_PIECE, SELECTED_COOR, MOVEMENTS,
        SELECTED_CELLID, SELECTED_PLAYER } = state;
    const [rowFrom, colFrom] = SELECTED_COOR.split('_')
    const validMoves = new Array();

    switch (SELECTED_PIECE) {

        // PAWN generate valid moves
        case 'PA':
            validMoves.push(...move_pawn({
                MOVEMENTS, SELECTED_CELLID,
                SELECTED_PLAYER, rowFrom, colFrom
            }))
            break;


        // ROOK generate valid moves
        case 'RO':
            validMoves.push(...move_rook({ rowFrom, colFrom }))
            break;


        // KNIGHT generate valid moves
        case 'KN':
            validMoves.push(...move_knight({ rowFrom, colFrom }))
            break;


        // BISHOP generate valid moves
        case 'BI':
            validMoves.push(...move_bishop({ rowFrom, colFrom }))
            break;
    }

    return validMoves;
}