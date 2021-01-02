
export default function isMoveValid(state, coorTo) {
    const { SELECTED_PLAYER, SELECTED_VALIDMOVES } = state;
    const cell = document.querySelector(`[data-coor='${coorTo}']`)
    const owner = cell.getAttribute('player');

    if (owner && owner == SELECTED_PLAYER)
        return false

    return SELECTED_VALIDMOVES.some(validCoor => coorTo == validCoor)
}