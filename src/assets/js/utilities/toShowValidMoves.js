
export default function showValidMoves(state, status) {

    const { SELECTED_VALIDMOVES, SELECTED_PLAYER } = state;

    switch (status.toLowerCase()) {

        case 'deactivate':
            SELECTED_VALIDMOVES.forEach(coor => {
                const cell = document.querySelector(`[data-coor='${coor}']`)
                cell.classList.remove('validmove');
            })
            break;

        case 'activate':
            SELECTED_VALIDMOVES.forEach(coor => {
                const cell = document.querySelector(`[data-coor='${coor}']`)
                const owner = cell.getAttribute('player');

                if (!owner || owner != SELECTED_PLAYER)
                    cell.classList.add('validmove');

            })
            break;

    }

}