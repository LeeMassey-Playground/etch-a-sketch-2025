const container = document.getElementById('container');
const resetButton = document.getElementById('reset-button');

function setGridSize() {
    let size;
    while (true) {
        size = Number(prompt('Enter x for grid size = x by x (1 - 128):'));
        if (!isNaN(size) && size >= 1 && size <= 128) {
            return size;
        }
        alert('Invalid input. Please enter a number between 1 and 128.');
    }
}

function renderGrid() {

    container.innerHTML = '';

    const gridSize = setGridSize();
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
        cell.style.flex = '0 0 ' + (100 / gridSize) + '%';
    }
}

resetButton.addEventListener('click', renderGrid);

container.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('cell')) {
        e.target.style.backgroundColor = 'black';
    }
});

renderGrid();
