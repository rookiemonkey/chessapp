import shouldDarken from '../utilities/toDarken';

export default function HTMLChessPieceCell(row, col, player, piece) {

    this.container = document.createElement('div');
    this.container.classList.add('col');
    this.container.classList.add(player);
    this.container.setAttribute('data-coor', `${row}_${col}`);
    this.container.setAttribute('player', player);
    this.container.setAttribute('piece', piece);
    this.container.setAttribute('id', `${piece}_${player}_${Math.random().toString().substr(2, 20)}`);

    this.container.innerHTML = `
        <img src="${require(`../../images/${piece}-${player}.svg`).default}" />
    `;

    shouldDarken(row, col)
        ? this.container.classList.add('dark')
        : null

}