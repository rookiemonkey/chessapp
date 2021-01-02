import move_bishop from './bishop';
import move_rook from './rook';

// a mixture of rook and bishop moves
export default function move_queen(props) {
    const { rowFrom, colFrom } = props;

    const diagonals = move_bishop({ rowFrom, colFrom })
    const straights = move_rook({ rowFrom, colFrom })

    return [...diagonals, ...straights];
}