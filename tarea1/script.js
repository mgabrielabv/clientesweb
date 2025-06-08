document.addEventListener('DOMContentLoaded', function() {
    const matrixSizeSelect = document.getElementById('matrixSize');
    const gridA = document.getElementById('gridA');
    const gridB = document.getElementById('gridB');
    
    let currentSize = 2;
    
    // Inicialización
    createMatrixGrids(currentSize);
    
    matrixSizeSelect.addEventListener('change', function() {
        currentSize = parseInt(this.value);
        createMatrixGrids(currentSize);
    });
    
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
});