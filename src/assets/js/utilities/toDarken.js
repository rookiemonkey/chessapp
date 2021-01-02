
export default function shouldDarken(row, col) {

    // row is even, but col is odd  OR
    // row is odd,  but col is even

    return row % 2 == 0 && col % 2 != 0
        || row % 2 != 0 && col % 2 == 0
        ? true
        : false

}