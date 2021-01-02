
export default function move_knight(props) {
    const { rowFrom, colFrom } = props;
    const validMoves = new Array();
    const row = parseInt(rowFrom);
    const col = parseInt(colFrom);
    const oneUp = row - 1
    const twoUp = row - 2
    const oneDown = row + 1
    const twoDown = row + 2
    const oneLeft = col - 1
    const twoLeft = col - 2
    const oneRight = col + 1
    const twoRight = col + 2




    // check for existing pieces on knight's path UP
    const cellOneUp = document.querySelector(`[data-coor='${oneUp}_${col}']`)
    const cellTwoUp = document.querySelector(`[data-coor='${twoUp}_${col}']`)

    if (twoUp && twoUp > 0 && !cellOneUp.id && !cellTwoUp.id) {
        const onItsRight = col + 1;
        const onItsLeft = col - 1;

        onItsRight > 0
            ? validMoves.push(`${twoUp}_${onItsRight}`)
            : null;

        onItsLeft > 0
            ? validMoves.push(`${twoUp}_${onItsLeft}`)
            : null;
    }




    // check for existing pieces on knight's path DOWN
    const cellOneDown = document.querySelector(`[data-coor='${oneDown}_${col}']`)
    const cellTwoDown = document.querySelector(`[data-coor='${twoDown}_${col}']`)

    if (twoDown && twoDown > 0 && twoDown <= 8 && !cellOneDown.id && !cellTwoDown.id) {
        const onItsRight = col + 1;
        const onItsLeft = col - 1;

        onItsRight > 0
            ? validMoves.push(`${twoDown}_${onItsRight}`)
            : null;

        onItsLeft > 0
            ? validMoves.push(`${twoDown}_${onItsLeft}`)
            : null;
    }




    // check for existing pieces on knight's path LEFT
    const cellOneLeft = document.querySelector(`[data-coor='${row}_${oneLeft}']`)
    const cellTwoLeft = document.querySelector(`[data-coor='${row}_${twoLeft}']`)

    if (twoLeft && twoLeft > 0 && !cellOneLeft.id && !cellTwoLeft.id) {
        const onItsTop = row - 1;
        const onItsBottom = row + 1;

        onItsTop > 0
            ? validMoves.push(`${onItsTop}_${twoLeft}`)
            : null;

        onItsBottom > 0 && onItsBottom <= 8
            ? validMoves.push(`${onItsBottom}_${twoLeft}`)
            : null;
    }




    // check for existing pieces on knight's path RIGHT
    const cellOneRight = document.querySelector(`[data-coor='${row}_${oneRight}']`)
    const cellTwoRight = document.querySelector(`[data-coor='${row}_${twoRight}']`)

    if (twoRight && twoRight > 0 && twoRight <= 8 && !cellOneRight.id && !cellTwoRight.id) {
        const onItsTop = row - 1;
        const onItsBottom = row + 1;

        onItsTop > 0
            ? validMoves.push(`${onItsTop}_${twoRight}`)
            : null;

        onItsBottom > 0 && onItsBottom <= 8
            ? validMoves.push(`${onItsBottom}_${twoRight}`)
            : null;
    }

    return validMoves;
}