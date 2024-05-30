import React, { useState, useEffect, useRef } from 'react';
import './Snake.css';

// Constants for the game settings
const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 10;
const SPEED_THRESHOLD = 5; // Increase speed every 5 foods eaten

// Directions the snake can move
const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

// Generate random coordinates for the food
// This function ensures that the food does not spawn on the snake's body.
const generateRandomFood = (snake) => {
    let newFood; // Initialize a variable to hold the new food coordinates.
    // Loop to keep generating food coordinates until they do not overlap with the snake's body.
    do {
        // Generate random x and y coordinates within the grid bounds.
        newFood = {
            x: Math.floor(Math.random() * COLS), // Random x coordinate between 0 and COLS - 1
            y: Math.floor(Math.random() * ROWS), // Random y coordinate between 0 and ROWS - 1
        };
    // Check if any segment of the snake occupies the generated food coordinates.
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    // Return the generated food coordinates.
    return newFood;
};


// Generate the game board matrix with snake and food positions
const generateMatrix = (snake, food) => {
    // Create a 2D array (matrix) filled with zeros representing the empty game board
    const matrix = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    // Iterate through each segment of the snake
    snake.forEach(segment => {
        // Set the corresponding cell in the matrix to 1 to represent the snake's body
        matrix[segment.y][segment.x] = 1; // Snake segments as 1
    });
    // Set the cell corresponding to the food's position to 2
    matrix[food.y][food.x] = 2; // Food as 2
    
    // Return the generated matrix
    return matrix;
};


const Snake = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }]); // Initial snake position
    const [food, setFood] = useState(generateRandomFood([{ x: 10, y: 10 }, { x: 9, y: 10 }])); // Initial food position
    const [direction, setDirection] = useState(Direction.RIGHT); // Initial direction
    const [speed, setSpeed] = useState(INITIAL_SPEED); // Initial speed
    const [gameOver, setGameOver] = useState(false); // Game over state
    const [foodsEaten, setFoodsEaten] = useState(0); // Count of foods eaten
    const gameLoop = useRef(null); // Reference to the game loop

    // Effect to handle keyboard input for snake direction
    useEffect(() => {
        // Function to handle key down events
        const handleKeyDown = (e) => {
            // Switch statement to determine which arrow key was pressed
            switch (e.key) {
                case 'ArrowUp':
                    // If the up arrow is pressed and the current direction is not down, change direction to up
                    if (direction !== Direction.DOWN) setDirection(Direction.UP);
                    break;
                case 'ArrowDown':
                    // If the down arrow is pressed and the current direction is not up, change direction to down
                    if (direction !== Direction.UP) setDirection(Direction.DOWN);
                    break;
                case 'ArrowLeft':
                    // If the left arrow is pressed and the current direction is not right, change direction to left
                    if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
                    break;
                case 'ArrowRight':
                    // If the right arrow is pressed and the current direction is not left, change direction to right
                    if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
                    break;
                default:
                    break; // Do nothing for other keys
            }
        };

        // Add the keydown event listener to the window
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove the event listener when the component unmounts or direction changes
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction]); // Dependency array to re-run this effect when the direction changes


    // Function to move the snake
    const moveSnake = () => {
        // Use the setSnake function to update the snake's state
        setSnake((prevSnake) => {
            // Get the current head of the snake
            const head = prevSnake[0];
            let newHead;

            // Determine the new head position based on the current direction
            switch (direction) {
                case Direction.UP:
                    newHead = { x: head.x, y: head.y - 1 };
                    break;
                case Direction.DOWN:
                    newHead = { x: head.x, y: head.y + 1 };
                    break;
                case Direction.LEFT:
                    newHead = { x: head.x - 1, y: head.y };
                    break;
                case Direction.RIGHT:
                    newHead = { x: head.x + 1, y: head.y };
                    break;
                default:
                    break; // If the direction is somehow undefined, do nothing
            }

            // Create a new snake array with the new head and the rest of the snake excluding the last segment
            const newSnake = [newHead, ...prevSnake.slice(0, -1)];
            return newSnake; // Return the updated snake array
        });
    };


   // Function to grow the snake
    const growSnake = () => {
        // Use the setSnake function to update the snake's state
        setSnake((prevSnake) => {
            // Get the current tail of the snake (last element in the array)
            const tail = prevSnake[prevSnake.length - 1];
            // Create a new segment for the tail with the same coordinates as the current tail
            const newTail = { x: tail.x, y: tail.y };
            // Return a new snake array with the new tail segment added to the end
            return [...prevSnake, newTail];
        });
    };


    // Function to increase the snake's speed
    const increaseSpeed = () => {
        // Use the setSpeed function to update the speed state
        setSpeed((prevSpeed) => 
            // Decrease the previous speed by SPEED_INCREMENT, ensuring it doesn't go below 50
            Math.max(50, prevSpeed - SPEED_INCREMENT)
        );
    };

    // Function to check if the snake has collided with walls or itself
    const isCollided = () => {
        // Get the head of the snake (first element in the array)
        const head = snake[0];
        // Check for collisions
        return (
            // Check if the head has collided with the left or right walls
            head.x < 0 || 
            head.x >= COLS || 
            // Check if the head has collided with the top or bottom walls
            head.y < 0 || 
            head.y >= ROWS || 
            // Check if the head has collided with any segment of the snake's body
            snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        );
    };


   // Function to check if the snake has eaten the food
    const isEatingFood = () => {
        // Get the head of the snake (first element in the array)
        const head = snake[0];
        // Check if the head's coordinates match the food's coordinates
        return head.x === food.x && head.y === food.y;
    };
        
    // Effect to handle game state changes
    useEffect(() => {
        // Check if the snake has collided with walls or itself
        if (isCollided()) {
            // Set game over state to true
            setGameOver(true);
            // Clear the game loop interval
            clearInterval(gameLoop.current);
        } else if (isEatingFood()) {
            // If the snake is eating food, grow the snake
            growSnake();
            // Generate new random coordinates for the food
            setFood(generateRandomFood(snake));
            // Increase the number of foods eaten
            setFoodsEaten((prevFoodsEaten) => prevFoodsEaten + 1);
            // Check if the speed should be increased
            if ((foodsEaten + 1) % SPEED_THRESHOLD === 0) {
                // Increase the speed of the game
                increaseSpeed();
            }
        }
    }, [snake, foodsEaten, food]); // Dependencies for the useEffect hook


   // Effect to start and stop the game loop
    useEffect(() => {
        // Check if the game is not over
        if (!gameOver) {
            // If the game is not over, clear any existing game loop interval
            clearInterval(gameLoop.current);
            // Start a new game loop interval with the updated speed
            gameLoop.current = setInterval(() => {
                // Move the snake in the current direction
                moveSnake();
            }, speed);
            
            // Return a cleanup function to clear the interval when the component unmounts or when the game is over
            return () => clearInterval(gameLoop.current);
        }
    }, [speed, gameOver, direction]); // Dependencies for the useEffect hook


    // Function to render the game grid
    const renderGrid = () => {
        // Generate the game board matrix with snake and food positions
        const matrix = generateMatrix(snake, food);
        // Initialize an array to store the grid cells
        const cells = [];

        // Iterate over each row and column of the game board matrix
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                // Get the value at the current row and column position in the matrix
                const value = matrix[row][col];
                // Push a JSX div element representing a grid cell into the cells array
                cells.push(
                    <div
                        key={`${row}-${col}`}
                        // Set the class name of the cell based on its value
                        className={`cell ${value === 1 ? 'snake' : ''} ${value === 2 ? 'food' : ''}`}
                        // Set the width and height of the cell using the CELL_SIZE constant
                        style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    ></div>
                );
            }
        }
        // Return the array of grid cells
        return cells;
    };


    // Function to restart the game
    const restartGame = () => {
        // Reset the snake to its initial position with two segments
        setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
        // Generate a new random position for the food, avoiding the snake's initial position
        setFood(generateRandomFood([{ x: 10, y: 10 }, { x: 9, y: 10 }]));
        // Set the initial direction of the snake to RIGHT
        setDirection(Direction.RIGHT);
        // Set the initial speed of the game
        setSpeed(INITIAL_SPEED);
        // Reset the game over state to false
        setGameOver(false);
        // Reset the number of foods eaten to 0
        setFoodsEaten(0);
    };


    return (
        <div className="snake-game">
            {/* Render the game grid */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)` }}>
                {renderGrid()}
            </div>
    
            {/* Render the game over overlay if the game is over */}
            {gameOver && (
                <div className="overlay">
                    <h1>Game Over!</h1>
                    <button onClick={restartGame}>Restart</button>
                </div>
            )}
        </div>
    );
};

export default Snake;
