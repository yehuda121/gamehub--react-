
import React, { useState, useEffect } from 'react';
import './Minesweeper.css';

const Minesweeper = () => {
    // State variables
    const [boardSize, setBoardSize] = useState(10);
    const [numMines, setNumMines] = useState(10);
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    // Initialize board when component mounts or board size/numMines change
    useEffect(() => {
        initializeBoard();
    }, [boardSize, numMines]);

    // Function to initialize the board
    const initializeBoard = () => {
        const newBoard = Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => ({
            isMine: false,
            isOpen: false,
            isFlagged: false,
            numMines: 0,
        })));

        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const x = Math.floor(Math.random() * boardSize);
            const y = Math.floor(Math.random() * boardSize);
            if (!newBoard[x][y].isMine) {
                newBoard[x][y].isMine = true;
                minesPlaced++;
            }
        }

        setBoard(newBoard);
        setGameOver(false); // Reset game over state
        setGameWon(false); // Reset game won state
    };

    // Function to handle cell click
    const handleClick = (x, y) => {
        if (gameOver || gameWon || board[x][y].isOpen || board[x][y].isFlagged) return;

        const newBoard = [...board];
        
        if (newBoard[x][y].isMine) {
            setGameOver(true);
            // Reveal all mines
            newBoard.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell.isMine) {
                        newBoard[rowIndex][colIndex].isOpen = true;
                    }
                });
            });
            setBoard(newBoard); // Update the board to reveal mines
            // Display game over message
            alert('Game Over! You clicked on a mine.');
        } else {
            // Logic to reveal adjacent cells if they are not mines
            const revealAdjacent = (x, y) => {
                if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || newBoard[x][y].isOpen) {
                    return;
                }
            
                newBoard[x][y].isOpen = true;
                if (countAdjacentMines(x, y) === 0) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            revealAdjacent(x + i, y + j);
                        }
                    }
                }
            };
            revealAdjacent(x, y);
        }

        setBoard(newBoard);
        checkWin(newBoard); // Check for win condition
    };

    // Function to handle right click (flagging)
    const handleRightClick = (event, x, y) => {
        event.preventDefault();
        if (gameOver || gameWon || board[x][y].isOpen) return;

        const newBoard = [...board];
        newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;

        setBoard(newBoard);
        checkWin(newBoard); // Check for win condition
    };

    // Function to count adjacent mines
    const countAdjacentMines = (x, y) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;
                if (newX >= 0 && newX < board.length && newY >= 0 && newY < board.length && board[newX][newY].isMine) {
                    count++;
                }
            }
        }
        return count;
    };

    // Function to check win condition
    const checkWin = (board) => {
        let hasWon = true;
        for (let row of board) {
            for (let cell of row) {
                if ((cell.isMine && !cell.isFlagged) || (!cell.isMine && !cell.isOpen)) {
                    hasWon = false;
                    break;
                }
            }
        }
        if (hasWon) {
            setGameWon(true);
            alert('Congratulations! You won the game!');
        }
    };

    // Function to handle difficulty level change
    const handleDifficultyChange = (event) => {
        const difficulty = event.target.value;
        switch (difficulty) {
        case 'easy':
            setBoardSize(8);
            setNumMines(8);
            break;
        case 'hard':
            setBoardSize(12);
            setNumMines(15);
            break;
        case 'very-hard':
            setBoardSize(15);
            setNumMines(20);
            break;
        default:
            break;
        }
    };
    
    // Function to start over and initialize the game
    const handleStartOver = () => {
        initializeBoard();
    };

    return (
        <div className="minesweeper">
            <div>
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select id="difficulty" onChange={handleDifficultyChange}>
                    <option value="easy">Easy</option>
                    <option value="hard">Hard</option>
                    <option value="very-hard">Very Hard</option>
                </select>
                <button onClick={handleStartOver}>Start Over</button>
            </div>
            {board.map((row, x) => (
                <div key={x} className="row">
                    {row.map((cell, y) => (
                        <div
                            key={`${x}-${y}`}
                            className={`cell ${cell.isOpen ? 'open' : ''} ${cell.isFlagged ? 'flag' : ''}`}
                            onClick={() => handleClick(x, y)}
                            onContextMenu={(event) => handleRightClick(event, x, y)}
                        >
                            {cell.isOpen && !cell.isMine && countAdjacentMines(x, y) > 0 && countAdjacentMines(x, y)}
                            {cell.isOpen && cell.isMine && <img id='mineCss' src='/mine.png' alt='mine' />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Minesweeper;
