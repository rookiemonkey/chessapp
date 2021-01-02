import shouldDarken from '../utilities/toDarken';

export default function HTMLChessPieceCellEmpty(row, col) {

    this.container = document.createElement('div');
    this.container.setAttribute('data-coor', `${row}_${col}`);
    this.container.classList.add('col');

    shouldDarken(row, col)
        ? this.container.classList.add('dark')
        : null

}