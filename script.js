const container = document.getElementById('grid-container');
const modeButtons = document.querySelectorAll('.mode-buttons');
const resetButton = document.getElementById('reset-button');
const changeGridSizeButton = document.getElementById('change-grid-size-button');
const modeIndicator = document.getElementById('mode-indicator');
const gridSizeIndicator = document.getElementById('grid-size-indicator');

let gridSize = 80;
let mode = 'normal';

let r = 0;
let g = 0;
let b = 0;

function changeGridSize() {
    while (true) {
        const input = prompt('Enter x for grid size = x by x (1 - 128):');

        if (input === null) {
            return null;
        }

        const size = Number(input);
        if (!isNaN(size) && size >= 1 && size <= 128) {
            return size;
        }
        alert('Invalid input. Please enter a number between 1 and 128.');
    }
}

function updateIndicators() {
    modeIndicator.textContent = `Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    gridSizeIndicator.textContent = `Grid Size: ${gridSize} x ${gridSize}`;
}

function reset() {
    mode = 'normal';
    container.innerHTML = '';
    renderGrid(gridSize);
    updateIndicators();
 }
 
 function renderGrid(size) {
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
        cell.style.flex = '0 0 ' + (100 / size) + '%';
    }
}

function setMode(newMode) {
    mode = newMode;
    updateIndicators();
}

function setColor() {;

    if (mode === 'normal' || mode === 'shade') {
        r = 0;
        g = 0;
        b = 0;
    }

    if (mode === 'rainbow') {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    return `rgb(${r}, ${g}, ${b})`;
}

function setOpacity(e) {

    if (mode === 'shade') {
        const current = parseFloat(e.target.style.opacity) || 0;
        const next = current + 0.1;
        return next > 1 ? 1 : next;
    }

    return 1;
}

function fill(e) {
    const cell = e.target;
    if (cell.classList.contains('cell')) {

        if (mode === 'shade' && parseFloat(cell.style.opacity) >= 1) {
            return;
        }

        cell.style.backgroundColor = setColor(e);
        cell.style.opacity = setOpacity(e);
    }
}

modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setMode(button.id);
    });
});

resetButton.addEventListener('click', () => {
    let confirmReset = confirm("Are you sure you want to reset the grid?");
    if (confirmReset) {
        gridSize = 80;
        reset();
    }
});

changeGridSizeButton.addEventListener('click', () => {
    const newGridSize = changeGridSize();
    if (newGridSize !== null) {
        gridSize = newGridSize;
        reset();
    }
});

container.addEventListener('mouseover', (e) => {
    fill(e);
});

reset();