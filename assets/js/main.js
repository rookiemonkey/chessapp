const ChessApp = function () {

    // GAME PRIVATE STATE
    const state = {
        START: true,
        SELECTED_PLAYER: '',
        SELECTED_CELLID: '',
        SELECTED_COOR: '',
        SELECTED_PIECE: '',
        SELECTED_VALIDMOVES: [],
        MOVEMENTS: new Object(),
        P1: { KI: 1, QU: 1, RO: 2, BI: 2, KN: 2, PA: 8 },
        P2: { KI: 1, QU: 1, RO: 2, BI: 2, KN: 2, PA: 8 },
        BOARD: {
            ROW1: ['RO-P1', 'KN-P1', 'BI-P1', 'QU-P1', 'KI-P1', 'BI-P1', 'KN-P1', 'RO-P1'],
            ROW2: ['PA-P1', 'PA-P1', 'PA-P1', 'PA-P1', 'PA-P1', 'PA-P1', 'PA-P1', 'PA-P1'],
            ROW3: [null, null, null, null, null, null, null, null],
            ROW4: [null, null, null, null, null, null, null, null],
            ROW5: [null, null, null, null, null, null, null, null],
            ROW6: [null, null, null, null, null, null, null, null],
            ROW7: ['PA-P2', 'PA-P2', 'PA-P2', 'PA-P2', 'PA-P2', 'PA-P2', 'PA-P2', 'PA-P2'],
            ROW8: ['RO-P2', 'KN-P2', 'BI-P2', 'QU-P2', 'KI-P2', 'BI-P2', 'KN-P2', 'RO-P2']
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

                    cell.container.onclick = event => {
                        const el = event.target;
                        const target_coor = el.getAttribute('data-coor');

                        // initial select of a cell to move
                        if (!state.SELECTED_COOR && !state.SELECTED_CELLID) {
                            const cols = [...document.querySelectorAll('.col')];
                            cols.forEach(col => col.classList.remove('selected'))

                            el.classList.add('selected')
                            state.SELECTED_COOR = target_coor;
                            state.SELECTED_CELLID = el.getAttribute('id');
                            state.SELECTED_PLAYER = el.getAttribute('player');
                            state.SELECTED_PIECE = el.getAttribute('piece');
                            state.SELECTED_VALIDMOVES = generateValidMoves(state);
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
                        this.move(state.SELECTED_COOR, target_coor);
                    }
                })
            })
        }

        static move(coorFrom, coorTo) {
            if (!state.SELECTED_COOR && !state.SELECTED_CELLID)
                return alert("NOTHING TO MOVE");

            this.incrementMove(state.SELECTED_CELLID)
            const { BOARD, SELECTED_PIECE, SELECTED_PLAYER, SELECTED_CELLID } = state;
            const from = document.querySelector(`[data-coor='${coorFrom}']`);
            const to = document.querySelector(`[data-coor='${coorTo}']`);
            const [rowFrom, colFrom] = coorFrom.split('_')
            const [rowTo, colTo] = coorTo.split('_')
            const isValidMove = isMoveValid(state, coorFrom, coorTo);

            // halt the function if move is invalid
            if (!isValidMove)
                return alert("NOT A VALID MOVE")

            // transfer all to 'to'
            to.classList.remove(SELECTED_PLAYER == 'P1' ? 'P2' : 'P1')
            to.classList.add(SELECTED_PLAYER);
            to.setAttribute('player', SELECTED_PLAYER);
            to.setAttribute('piece', SELECTED_PIECE);
            to.setAttribute('id', SELECTED_CELLID);
            to.textContent = from.textContent;

            // remove all attributes, props, text content, P1/P2 class from 'from'
            from.classList.remove(from.getAttribute('player'));
            from.removeAttribute('player');
            from.removeAttribute('piece');
            from.removeAttribute('id');
            from.textContent = '';

            // update the state board
            BOARD[`ROW${rowFrom}`][colFrom - 1] = null;
            BOARD[`ROW${rowTo}`][colTo - 1] = `${SELECTED_PIECE}-${SELECTED_PLAYER}`;

            // reset the state
            showValidMoves(state, 'DEACTIVATE')
            state.SELECTED_CELLID = '';
            state.SELECTED_COOR = '';
            state.SELECTED_PLAYER = '';
            state.SELECTED_PIECE = '';
            state.SELECTED_VALIDMOVES = [];

            document.querySelector('.selected').classList.remove('selected');
            console.log(state)
        }
    }

}();

ChessApp.start();
