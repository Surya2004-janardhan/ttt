// script.js

// Initialize a 3x3 matrix with null values
let matrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Track empty indices
let emptyIndices = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2]
];

// Get elements
const boxes = document.querySelectorAll('.box');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Handle clicks on grid items
boxes.forEach(box => {
    box.addEventListener('click', function() {
        // Get row and column from data attributes
        const row = parseInt(this.getAttribute('data-row'));
        const col = parseInt(this.getAttribute('data-col'));

        // Check if the cell is empty
        if (matrix[row][col] === null) {
            // Update the matrix
            matrix[row][col] = 0;

            // Update the grid item
            this.textContent = '0';
            this.classList.add('filled');

            // Remove the move from emptyIndices
            emptyIndices = emptyIndices.filter(index => index[0] !== row || index[1] !== col);

            // Check for a winner
            if (checkForWinner(0)) {
                displayMessage('You win!');
                setTimeout(resetGame, 2000); // Auto-reset after 2 seconds
                return;
            }

            // Computer's move
            if (emptyIndices.length > 0) {
                computerMove();
                if (checkForWinner('X')) {
                    displayMessage('Computer wins!');
                    setTimeout(resetGame, 2000); // Auto-reset after 2 seconds
                    return;
                }
            }

            // Check for a tie
            if (emptyIndices.length === 0) {
                displayMessage('It\'s a tie!');
                setTimeout(resetGame, 2000); // Auto-reset after 2 seconds
            }
        }
    });
});

// Function to handle computer's move
function computerMove() {
    if (emptyIndices.length === 0) {
        return;
    }

    // Select a random index from emptyIndices
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    const [row, col] = emptyIndices[randomIndex];

    // Update the matrix
    matrix[row][col] = 'X';

    // Update the grid item
    const box = document.querySelector(`.box[data-row="${row}"][data-col="${col}"]`);
    box.textContent = 'X';
    box.classList.add('filled');

    // Remove the move from emptyIndices
    emptyIndices.splice(randomIndex, 1);
}

// Function to check for a winner
function checkForWinner(symbol) {
    const winPatterns = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winPatterns.some(pattern => 
        pattern.every(([r, c]) => matrix[r][c] === symbol)
    );
}

// Function to display a message
function displayMessage(message) {
    messageElement.textContent = message;
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    // Reset matrix and empty indices
    matrix = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    emptyIndices = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];

    // Clear grid items and message
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('filled');
    });
    messageElement.textContent = '';
}
