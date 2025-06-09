document.addEventListener('DOMContentLoaded', function() {
    const matrixSizeSelect = document.getElementById('matrixSize');
    const gridA = document.getElementById('gridA');
    const gridB = document.getElementById('gridB');
    
    let currentSize = 2;
    
    createMatrixGrids(currentSize);
    
    matrixSizeSelect.addEventListener('change', function() {
        currentSize = parseInt(this.value);
        createMatrixGrids(currentSize);
    });

    document.getElementById('sum').addEventListener('click', () => performOperation('sum'));
    document.getElementById('subtractAB').addEventListener('click', () => performOperation('subtractAB'));
    document.getElementById('subtractBA').addEventListener('click', () => performOperation('subtractBA'));
    document.getElementById('randomA').addEventListener('click', () => fillRandom('A'));
    document.getElementById('randomB').addEventListener('click', () => fillRandom('B'));
    document.getElementById('clearA').addEventListener('click', () => clearMatrix('A'));
    document.getElementById('clearB').addEventListener('click', () => clearMatrix('B'));

    function createMatrixGrids(size) {
        createMatrixGrid(gridA, size, 'A');
        createMatrixGrid(gridB, size, 'B');
    }
    
    function createMatrixGrid(gridElement, size, prefix) {
        gridElement.innerHTML = '';
        gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `${prefix}_${i}_${j}`;
                input.placeholder = '0';
                gridElement.appendChild(input);
            }
        }
    }

    function getMatrix(prefix) {
        const matrix = [];
        for (let i = 0; i < currentSize; i++) {
            const row = [];
            for (let j = 0; j < currentSize; j++) {
                const value = parseFloat(document.getElementById(`${prefix}_${i}_${j}`).value) || 0;
                row.push(value);
            }
            matrix.push(row);
        }
        return matrix;
    }

    function displayResult(matrix) {
        const resultGrid = document.getElementById('resultMatrix');
        resultGrid.innerHTML = '';
        resultGrid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
        
        matrix.forEach(row => {
            row.forEach(val => {
                const cell = document.createElement('div');
                cell.className = 'result-cell';
                cell.textContent = val;
                resultGrid.appendChild(cell);
            });
        });
    }

    function matrixSum(a, b) {
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
    }

    function matrixSubtract(a, b) {
        return a.map((row, i) => row.map((val, j) => val - b[i][j]));
    }

    function fillRandom(prefix) {
        console.log('Llenando aleatorio', prefix);
        for (let i = 0; i < currentSize; i++) {
            for (let j = 0; j < currentSize; j++) {
                const input = document.getElementById(`${prefix}_${i}_${j}`);
                if (input) {
                    input.value = Math.floor(Math.random() * 10);
                }
            }
        }
    }

    function clearMatrix(prefix) {
        console.log('Limpiando', prefix);
        for (let i = 0; i < currentSize; i++) {
            for (let j = 0; j < currentSize; j++) {
                const input = document.getElementById(`${prefix}_${i}_${j}`);
                if (input) {
                    input.value = '';
                }
            }
        }
    }

    function performOperation(type) {
        const matrixA = getMatrix('A');
        const matrixB = getMatrix('B');
        let result;
        if (type === 'sum') {
            result = matrixSum(matrixA, matrixB);
        } else if (type === 'subtractAB') {
            result = matrixSubtract(matrixA, matrixB);
        } else if (type === 'subtractBA') {
            result = matrixSubtract(matrixB, matrixA);
        }
        displayResult(result);
    }
});
