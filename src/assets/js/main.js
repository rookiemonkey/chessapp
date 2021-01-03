import HTMLChessPieceCell from './components/Cell';
import HTMLChessPieceCellEmpty from './components/CellEmpty';
import getValidMoves from './moves/_toGetValidMoves';
import isMoveValid from './utilities/isMoveValid';
import showValidMoves from './utilities/toShowValidMoves';

const ChessApp = function () {

    // GAME PRIVATE STATE
    const state = {
        START: true,
        CURRENT_PLAYER: 'WHI',
        SELECTED_PLAYER: '',
        SELECTED_CELLID: '',
        SELECTED_COOR: '',
        SELECTED_PIECE: '',
        SELECTED_VALIDMOVES: [],
        MOVEMENTS: new Object(),
        BLK: {
            pieces: { KI: 1, QU: 1, RO: 2, BI: 2, KN: 2, PA: 8 },
            attacked: { KI: 0, QU: 0, RO: 0, BI: 0, KN: 0, PA: 0 }
        },
        WHI: {
            pieces: { KI: 1, QU: 1, RO: 2, BI: 2, KN: 2, PA: 8 },
            attacked: { KI: 0, QU: 0, RO: 0, BI: 0, KN: 0, PA: 0 }
        },
        BOARD: {
            ROW1: ['RO-BLK', 'KN-BLK', 'BI-BLK', 'QU-BLK', 'KI-BLK', 'BI-BLK', 'KN-BLK', 'RO-BLK'],
            ROW2: ['PA-BLK', 'PA-BLK', 'PA-BLK', 'PA-BLK', 'PA-BLK', 'PA-BLK', 'PA-BLK', 'PA-BLK'],
            ROW3: [null, null, null, null, null, null, null, null],
            ROW4: [null, null, null, null, null, null, null, null],
            ROW5: [null, null, null, null, null, null, null, null],
            ROW6: [null, null, null, null, null, null, null, null],
            ROW7: ['PA-WHI', 'PA-WHI', 'PA-WHI', 'PA-WHI', 'PA-WHI', 'PA-WHI', 'PA-WHI', 'PA-WHI'],
            ROW8: ['RO-WHI', 'KN-WHI', 'BI-WHI', 'QU-WHI', 'KI-WHI', 'BI-WHI', 'KN-WHI', 'RO-WHI']
        }
    }

    return class Application {

        static incrementMove(cell_id) {
            const movements = Object.keys(state.MOVEMENTS)
            const hasMoved = movements.some(moves => moves == cell_id)

            hasMoved
                ? state.MOVEMENTS[cell_id] += 1
                : state.MOVEMENTS[cell_id] = 1
        }

        static getCurrentPlayer() {
            return state.CURRENT_PLAYER;
        }

        static start() {
            state.START = true;

            [...document.querySelectorAll("[data-row]")].forEach(row => {
                state.BOARD[`ROW${row.dataset.row}`].forEach((rowVal, ind) => {
                    const rowNum = row.dataset.row;
                    const colNum = ind + 1;
                    let cell;

                    if (rowVal) {
                        const [piece, player] = rowVal.split('-');
                        cell = new HTMLChessPieceCell(rowNum, colNum, player, piece);
                        row.append(cell.container);
                    }

                    else {
                        cell = new HTMLChessPieceCellEmpty(rowNum, colNum);
                        row.append(cell.container);
                    }

                    cell.container.onclick = () => this.cellOnClick(cell.container)
                })
            })
        }

        static cellOnClick(cell) {
            const target_coor = cell.getAttribute('data-coor');

            // initial select of a cell to move && prevent current 
            // player to select other player's pieces
            if (!state.SELECTED_COOR
                && !state.SELECTED_CELLID
                && (cell.getAttribute('player') == state.CURRENT_PLAYER)) {
                const cols = [...document.querySelectorAll('.col')];
                cols.forEach(col => col.classList.remove('selected'))

                cell.classList.add('selected')
                state.SELECTED_COOR = target_coor;
                state.SELECTED_CELLID = cell.getAttribute('id');
                state.SELECTED_PLAYER = cell.getAttribute('player');
                state.SELECTED_PIECE = cell.getAttribute('piece');
                state.SELECTED_VALIDMOVES = getValidMoves(state);
                console.log(state)
                showValidMoves(state, 'ACTIVATE')
                return null;
            }

            // disable select, when selected the same cell
            if (target_coor == state.SELECTED_COOR) {

                document.querySelector('.selected')
                    .classList.remove('selected')

                showValidMoves(state, 'DEACTIVATE')
                state.SELECTED_CELLID = '';
                state.SELECTED_COOR = '';
                state.SELECTED_PLAYER = '';
                state.SELECTED_PIECE = '';
                state.SELECTED_VALIDMOVES = [];
                return null;
            }

            // proceed in moving
            this.cellOnMove(state.SELECTED_COOR, target_coor);
        }

        static cellOnMove(coorFrom, coorTo) {
            if (!state.SELECTED_COOR && !state.SELECTED_CELLID)
                return alert("NOT A VALID MOVE");

            const { BOARD, SELECTED_PIECE, SELECTED_PLAYER, SELECTED_CELLID } = state;
            const from = document.querySelector(`[data-coor='${coorFrom}']`);
            const to = document.querySelector(`[data-coor='${coorTo}']`);
            const [rowFrom, colFrom] = coorFrom.split('_')
            const [rowTo, colTo] = coorTo.split('_')
            const isValidMove = isMoveValid(state, coorTo);

            // halt the function if move is invalid
            if (!isValidMove)
                return alert("NOT A VALID MOVE")

            // check if the the target coor has a chess piece
            if (to.id) {
                const otherPlayer = to.getAttribute('player');
                const hisChessPiece = to.getAttribute('piece');
                state[otherPlayer].pieces[hisChessPiece] -= 1;
                state[state.CURRENT_PLAYER].attacked[hisChessPiece] += 1;
                this.cellOnCaputure(to.getAttribute('player'));
            }

            // transfer all to 'to'
            to.classList.remove(SELECTED_PLAYER == 'BLK' ? 'WHI' : 'BLK')
            to.classList.add(SELECTED_PLAYER);
            to.setAttribute('player', SELECTED_PLAYER);
            to.setAttribute('piece', SELECTED_PIECE);
            to.setAttribute('id', SELECTED_CELLID);
            to.innerHTML = from.innerHTML;

            // remove all attributes, props, text content, BLK/WHI class from 'from'
            from.classList.remove(from.getAttribute('player'));
            from.removeAttribute('player');
            from.removeAttribute('piece');
            from.removeAttribute('id');
            from.innerHTML = '';

            // update the state board and increment move number
            this.incrementMove(state.SELECTED_CELLID)
            BOARD[`ROW${rowFrom}`][colFrom - 1] = null;
            BOARD[`ROW${rowTo}`][colTo - 1] = `${SELECTED_PIECE}-${SELECTED_PLAYER}`;

            // reset the state
            showValidMoves(state, 'DEACTIVATE')
            state.SELECTED_CELLID = '';
            state.SELECTED_COOR = '';
            state.SELECTED_PLAYER = '';
            state.SELECTED_PIECE = '';
            state.SELECTED_VALIDMOVES = [];
            state.CURRENT_PLAYER = state.CURRENT_PLAYER == 'WHI' ? 'BLK' : 'WHI';

            document.querySelector('.selected').classList.remove('selected');
            document.querySelector('#who_is_playing').textContent = `${state.CURRENT_PLAYER}'s turn`
            console.log(state)
        }

        static cellOnCaputure(targetPlayer) {
            const captures = document.querySelector(`#${state.CURRENT_PLAYER}-attacked`);
            const attacked = state[state.CURRENT_PLAYER].attacked;
            captures.innerHTML = ``;

            for (let piece in attacked) {

                if (attacked[piece]) {
                    for (let i = 1; i <= attacked[piece]; i++) {
                        const piece_img = document.createElement('img');
                        piece_img.src = require(`../images/${piece}-${targetPlayer}.svg`).default;
                        captures.appendChild(piece_img);
                    }
                }

            }

        }
    }

}();


ChessApp.start();

export default ChessApp;