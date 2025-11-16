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
    let size;
    while (true) {
        size = Number(prompt('Enter x for grid size = x by x (1 - 128):'));
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

function renderGrid(gridSize) {

    updateIndicators();
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
        cell.style.flex = '0 0 ' + (100 / gridSize) + '%';
    }
}

function reset(n = 80) {
    gridSize = n;
    mode = 'normal';
    container.innerHTML = '';
    renderGrid(gridSize);
}

function setMode(newMode) {
    mode = newMode;
    updateIndicators();
}

function setColor(e) {;

    if (mode === 'normal') {
        r = 0;
        g = 0;
        b = 0;
    }

    if (mode === 'rainbow') {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    if (mode === 'shade') {
        r = 0;
        g = 0;
        b = 0;
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
    reset();
});

changeGridSizeButton.addEventListener('click', () => {
    gridSize = changeGridSize();
    reset(gridSize);
});

container.addEventListener('mouseover', (e) => {
    fill(e);
});

reset();