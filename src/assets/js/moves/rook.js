
export default function move_rook(props) {
    const { rowFrom, colFrom } = props;
    const validMoves = new Array();
    const currentCoor = [rowFrom, colFrom];

    currentCoor.forEach((coor, ind) => {

        for (let i = 1; i <= 8; i++) {

            if (ind == 0 && `${coor}_${i}` != `${rowFrom}_${colFrom}`) {
                validMoves.push(`${coor}_${i}`)
            }

            if (ind == 1 && `${i}_${coor}` != `${rowFrom}_${colFrom}`) {
                validMoves.push(`${i}_${coor}`)
            }
        }

    })

    return validMoves;
}