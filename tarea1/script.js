document.addEventListener('DOMContentLoaded', function() {
    const matrixSizeSelect = document.getElementById('matrixSize');
    const gridA = document.getElementById('gridA');
    const gridB = document.getElementById('gridB');
    const resultMatrix = document.getElementById('resultMatrix');
    const resultText = document.getElementById('resultText') || {textContent: ''};
    const errorText = document.getElementById('errorText') || {textContent: ''};
    const scalarValueInput = document.getElementById('scalarValue') || {value: 1};
    let currentSize = 2;

    
    createMatrixGrids(2);
    
    matrixSizeSelect.addEventListener('change', function() {
        currentSize = parseInt(this.value);
        createMatrixGrids(currentSize);
        clearResult();
    });
    
    document.getElementById('sum').addEventListener('click', () => performOperation('sum'));
    document.getElementById('subtractAB').addEventListener('click', () => performOperation('subtractAB'));
    document.getElementById('subtractBA').addEventListener('click', () => performOperation('subtractBA'));
    document.getElementById('multiply').addEventListener('click', () => performOperation('multiply'));
    if (document.getElementById('scalarA')) document.getElementById('scalarA').addEventListener('click', () => performOperation('scalarA'));
    if (document.getElementById('scalarB')) document.getElementById('scalarB').addEventListener('click', () => performOperation('scalarB'));
    if (document.getElementById('transposeA')) document.getElementById('transposeA').addEventListener('click', () => performOperation('transposeA'));
    if (document.getElementById('transposeB')) document.getElementById('transposeB').addEventListener('click', () => performOperation('transposeB'));
    if (document.getElementById('determinantA')) document.getElementById('determinantA').addEventListener('click', () => performOperation('determinantA'));
    if (document.getElementById('determinantB')) document.getElementById('determinantB').addEventListener('click', () => performOperation('determinantB'));
    if (document.getElementById('inverseA')) document.getElementById('inverseA').addEventListener('click', () => performOperation('inverseA'));
    if (document.getElementById('inverseB')) document.getElementById('inverseB').addEventListener('click', () => performOperation('inverseB'));
    if (document.getElementById('identity')) document.getElementById('identity').addEventListener('click', () => performOperation('identity'));
    document.getElementById('randomA').addEventListener('click', () => fillRandom('A'));
    document.getElementById('randomB').addEventListener('click', () => fillRandom('B'));
    document.getElementById('clearA').addEventListener('click', () => clearMatrix('A'));
    document.getElementById('clearB').addEventListener('click', () => clearMatrix('B'));
    if (document.getElementById('exampleA')) document.getElementById('exampleA').addEventListener('click', () => fillExample('A'));
    if (document.getElementById('exampleB')) document.getElementById('exampleB').addEventListener('click', () => fillExample('B'));
    

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
                input.step = 'any';
                gridElement.appendChild(input);
            }
        }
    }
    
    function getMatrix(prefix) {
        const size = currentSize;
        const matrix = [];
        
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const value = parseFloat(document.getElementById(`${prefix}_${i}_${j}`).value) || 0;
                row.push(value);
            }
            matrix.push(row);
        }
        
        return matrix;
    }
    
    function setMatrix(prefix, matrix) {
        const size = matrix.length;
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`${prefix}_${i}_${j}`).value = matrix[i][j];
            }
        }
    }
    
    function displayResult(matrix, text = '') {
        resultMatrix.innerHTML = '';
        if (resultText) resultText.innerHTML = text || '';
        if (errorText) errorText.textContent = '';

        if (typeof matrix === 'number') {
            // Para determinantes
            if (Number.isInteger(matrix)) {
                resultText.innerHTML = `${text} ${matrix}`;
            } else {
                resultText.innerHTML = `${text} ${matrix}`;
            }
            return;
        }

        const size = matrix.length;
        resultMatrix.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('div');
                cell.className = 'result-cell';
                const value = matrix[i][j];
                cell.textContent = Number.isInteger(value) ? value : value;
                resultMatrix.appendChild(cell);
            }
        }
    }
    
    function displayError(message) {
        if (errorText) errorText.textContent = message;
        if (resultText) resultText.textContent = '';
        resultMatrix.innerHTML = '';
    }
    
    function clearResult() {
        if (resultText) resultText.textContent = '';
        if (errorText) errorText.textContent = '';
        resultMatrix.innerHTML = '';
    }
    
    function clearMatrix(prefix) {
        const size = currentSize;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`${prefix}_${i}_${j}`).value = '';
            }
        }
    }
    
    function fillRandom(prefix) {
        for (let i = 0; i < currentSize; i++) {
            for (let j = 0; j < currentSize; j++) {
                const input = document.getElementById(`${prefix}_${i}_${j}`);
                if (input) {
                    input.value = Math.floor(Math.random() * 10);
                }
            }
        }
    }
    
    function fillExample(prefix) {
        const size = currentSize;
        let exampleMatrix;
        
        if (size === 2) {
            exampleMatrix = prefix === 'A' ?
                [[2, 1], [1, 3]] : 
                [[1, 0], [0, 1]];
        } else if (size === 3) {
            exampleMatrix = prefix === 'A' ? 
                [[1, 2, 3], [0, 1, 4], [5, 6, 0]] : 
                [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        } else {
           
            exampleMatrix = [];
            for (let i = 0; i < size; i++) {
                const row = [];
                for (let j = 0; j < size; j++) {
                    row.push(i === j ? 1 : 0);
                }
                exampleMatrix.push(row);
            }
        }
        
        setMatrix(prefix, exampleMatrix);
    }
    

    function matrixSum(a, b) {
        const size = a.length;
        const result = [];
        
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(a[i][j] + b[i][j]);
            }
            result.push(row);
        }
        
        return result;
    }
    
    function matrixSubtract(a, b) {
        const size = a.length;
        const result = [];
        
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(a[i][j] - b[i][j]);
            }
            result.push(row);
        }
        
        return result;
    }
    
    function matrixMultiply(a, b) {
        const size = a.length;
        const result = [];
        
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                let sum = 0;
                for (let k = 0; k < size; k++) {
                    sum += a[i][k] * b[k][j];
                }
                row.push(sum);
            }
            result.push(row);
        }
        
        return result;
    }
    
    function scalarMultiply(matrix, scalar) {
        return matrix.map(row => 
            row.map(value => value * scalar)
        );
    }
    
    function transpose(matrix) {
        return matrix[0].map((_, i) => 
            matrix.map(row => row[i])
        );
    }
    
    function determinant(matrix) {
        const size = matrix.length;
        
        if (size === 1) return matrix[0][0];
        if (size === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        
        let det = 0;
        for (let j = 0; j < size; j++) {
            const minor = [];
            for (let i = 1; i < size; i++) {
                minor.push(matrix[i].filter((_, idx) => idx !== j));
            }
            det += matrix[0][j] * Math.pow(-1, j) * determinant(minor);
        }
        
        return det;
    }
    
    function inverse(matrix) {
        const size = matrix.length;
        const det = determinant(matrix);
        
        if (det === 0) throw new Error('La matriz no es invertible (determinante = 0)');
        
        if (size === 2) {
            const a = matrix[0][0], b = matrix[0][1];
            const c = matrix[1][0], d = matrix[1][1];
            return [
                [d / det, -b / det],
                [-c / det, a / det]
            ];
        }
        

        const adjugate = [];
        for (let i = 0; i < size; i++) {
            const adjRow = [];
            for (let j = 0; j < size; j++) {
                const minor = [];
                for (let k = 0; k < size; k++) {
                    if (k === i) continue;
                    const minorRow = [];
                    for (let l = 0; l < size; l++) {
                        if (l === j) continue;
                        minorRow.push(matrix[k][l]);
                    }
                    minor.push(minorRow);
                }
                const minorDet = determinant(minor);
                adjRow.push(Math.pow(-1, i + j) * minorDet);
            }
            adjugate.push(adjRow);
        }
        
        const transposedAdjugate = transpose(adjugate);
        return scalarMultiply(transposedAdjugate, 1 / det);
    }
    
    function identityMatrix(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(i === j ? 1 : 0);
            }
            matrix.push(row);
        }
        return matrix;
    }
    
    function performOperation(operation) {
        try {
            let result, text;
            
            switch (operation) {
                case 'sum':
                    result = matrixSum(getMatrix('A'), getMatrix('B'));
                    text = 'A + B =';
                    break;
                case 'subtractAB':
                    result = matrixSubtract(getMatrix('A'), getMatrix('B'));
                    text = 'A - B =';
                    break;
                case 'subtractBA':
                    result = matrixSubtract(getMatrix('B'), getMatrix('A'));
                    text = 'B - A =';
                    break;
                case 'multiply':
                    result = matrixMultiply(getMatrix('A'), getMatrix('B'));
                    text = 'A × B =';
                    break;
                case 'scalarA':
                    result = scalarMultiply(getMatrix('A'), parseFloat(scalarValueInput.value) || 1);
                    text = `${scalarValueInput.value || 1} × A =`;
                    break;
                case 'scalarB':
                    result = scalarMultiply(getMatrix('B'), parseFloat(scalarValueInput.value) || 1);
                    text = `${scalarValueInput.value || 1} × B =`;
                    break;
                case 'transposeA':
                    result = transpose(getMatrix('A'));
                    text = 'A<sup>T</sup> =';
                    break;
                case 'transposeB':
                    result = transpose(getMatrix('B'));
                    text = 'B<sup>T</sup> =';
                    break;
                case 'determinantA':
                    result = determinant(getMatrix('A'));
                    text = 'det(A) =';
                    break;
                case 'determinantB':
                    result = determinant(getMatrix('B'));
                    text = 'det(B) =';
                    break;
                case 'inverseA':
                    result = inverse(getMatrix('A'));
                    text = 'A<sup>-1</sup> =';
                    break;
                case 'inverseB':
                    result = inverse(getMatrix('B'));
                    text = 'B<sup>-1</sup> =';
                    break;
                case 'identity':
                    result = identityMatrix(currentSize);
                    text = `Matriz identidad ${currentSize}×${currentSize} =`;
                    break;
                default:
                    throw new Error('Operación no reconocida');
            }
            
            displayResult(result, text);
        } catch (error) {
            displayError(error.message);
        }
    }
    
});
