<<<<<<< HEAD
import React, { useState } from 'react';
import './Backgammon.css';
import Dice from './Dice';

const initialBoard = [
  { position: 1, color: 'white', count: 2 },
  { position: 2, color: null, count: 0 },
  { position: 3, color: null, count: 0 },
  { position: 4, color: null, count: 0 },
  { position: 5, color: null, count: 0 },
  { position: 6, color: 'black', count: 5 },
  { position: 7, color: null, count: 0 },
  { position: 8, color: 'black', count: 3 },
  { position: 9, color: null, count: 0 },
  { position: 10, color: null, count: 0 },
  { position: 11, color: null, count: 0 },
  { position: 12, color: 'white', count: 5 },
  { position: 13, color: 'black', count: 5 },
  { position: 14, color: null, count: 0 },
  { position: 15, color: null, count: 0 },
  { position: 16, color: null, count: 0 },
  { position: 17, color: 'white', count: 3 },
  { position: 18, color: null, count: 0 },
  { position: 19, color: 'white', count: 5 },
  { position: 20, color: null, count: 0 },
  { position: 21, color: null, count: 0 },
  { position: 22, color: null, count: 0 },
  { position: 23, color: null, count: 0 },
  { position: 24, color: 'black', count: 2 },
];

const Backgammon = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [dice, setDice] = useState([1, 1]);
  const [rolled, setRolled] = useState(false);
  const [selectedDice, setSelectedDice] = useState([]);
  const [movesLeft, setMovesLeft] = useState(2);

  const handleMove = (from, to) => {
    const newBoard = [...board];
    const fromStack = newBoard.find(stack => stack.position === from);
    const toStack = newBoard.find(stack => stack.position === to);

    if (
      fromStack &&
      toStack &&
      fromStack.color &&
      fromStack.color === (isBlackTurn ? 'black' : 'white')
    ) {
      if (toStack.color && toStack.color !== fromStack.color && toStack.count === 1) {
        toStack.color = fromStack.color;
        toStack.count = 1;
      } else if (!toStack.color || toStack.color === fromStack.color) {
        toStack.color = fromStack.color;
        toStack.count += 1;
      }
      fromStack.count -= 1;
      if (fromStack.count === 0) {
        fromStack.color = null;
      }
      setBoard(newBoard);
      setMovesLeft(movesLeft - 1);

      if (movesLeft === 1) {
        setIsBlackTurn(!isBlackTurn);
        setRolled(false);
        setSelectedDice([]);
        setMovesLeft(2);
      }
    }
  };

  const handleDiceClick = (value) => {
    if (!selectedDice.includes(value)) {
      setSelectedDice([...selectedDice, value]);
      setMovesLeft(movesLeft + (dice[0] === dice[1] ? 2 : 0)); // Handle doubles
    }
  };

  const rollDice = () => {
    if (!rolled) {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      setDice([die1, die2]);
      setRolled(true);
      setSelectedDice([]);
      setMovesLeft(die1 === die2 ? 4 : 2); // Handle doubles
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="upper-board">
          <div className="quarter left">
            {board.slice(0, 6).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[0] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bar"></div>
          <div className="quarter right">
            {board.slice(6, 12).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[0] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lower-board">
          <div className="quarter left">
            {board.slice(12, 18).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[1] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bar"></div>
          <div className="quarter right">
            {board.slice(18).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[1] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="bear-off">
          <div className="bear-off-cell black"></div>
          <div className="bear-off-cell white"></div>
        </div>
        <div className="dice-area">
          <Dice dice={dice} rollDice={rollDice} onDiceClick={handleDiceClick} />
          <div className="turn">{isBlackTurn ? 'Black Turn' : 'White Turn'}</div>
        </div>
      </div>
    </div>
  );
};

export default Backgammon;
=======
import React, { useState } from 'react';
import './Backgammon.css';
import Dice from './Dice';

const initialBoard = [
  { position: 1, color: 'white', count: 2 },
  { position: 2, color: null, count: 0 },
  { position: 3, color: null, count: 0 },
  { position: 4, color: null, count: 0 },
  { position: 5, color: null, count: 0 },
  { position: 6, color: 'black', count: 5 },
  { position: 7, color: null, count: 0 },
  { position: 8, color: 'black', count: 3 },
  { position: 9, color: null, count: 0 },
  { position: 10, color: null, count: 0 },
  { position: 11, color: null, count: 0 },
  { position: 12, color: 'white', count: 5 },
  { position: 13, color: 'black', count: 5 },
  { position: 14, color: null, count: 0 },
  { position: 15, color: null, count: 0 },
  { position: 16, color: null, count: 0 },
  { position: 17, color: 'white', count: 3 },
  { position: 18, color: null, count: 0 },
  { position: 19, color: 'white', count: 5 },
  { position: 20, color: null, count: 0 },
  { position: 21, color: null, count: 0 },
  { position: 22, color: null, count: 0 },
  { position: 23, color: null, count: 0 },
  { position: 24, color: 'black', count: 2 },
];

const Backgammon = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [dice, setDice] = useState([1, 1]);
  const [rolled, setRolled] = useState(false);
  const [selectedDice, setSelectedDice] = useState([]);
  const [movesLeft, setMovesLeft] = useState(2);

  const handleMove = (from, to) => {
    const newBoard = [...board];
    const fromStack = newBoard.find(stack => stack.position === from);
    const toStack = newBoard.find(stack => stack.position === to);

    if (
      fromStack &&
      toStack &&
      fromStack.color &&
      fromStack.color === (isBlackTurn ? 'black' : 'white')
    ) {
      if (toStack.color && toStack.color !== fromStack.color && toStack.count === 1) {
        toStack.color = fromStack.color;
        toStack.count = 1;
      } else if (!toStack.color || toStack.color === fromStack.color) {
        toStack.color = fromStack.color;
        toStack.count += 1;
      }
      fromStack.count -= 1;
      if (fromStack.count === 0) {
        fromStack.color = null;
      }
      setBoard(newBoard);
      setMovesLeft(movesLeft - 1);

      if (movesLeft === 1) {
        setIsBlackTurn(!isBlackTurn);
        setRolled(false);
        setSelectedDice([]);
        setMovesLeft(2);
      }
    }
  };

  const handleDiceClick = (value) => {
    if (!selectedDice.includes(value)) {
      setSelectedDice([...selectedDice, value]);
      setMovesLeft(movesLeft + (dice[0] === dice[1] ? 2 : 0)); // Handle doubles
    }
  };

  const rollDice = () => {
    if (!rolled) {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      setDice([die1, die2]);
      setRolled(true);
      setSelectedDice([]);
      setMovesLeft(die1 === die2 ? 4 : 2); // Handle doubles
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="upper-board">
          <div className="quarter left">
            {board.slice(0, 6).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[0] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bar"></div>
          <div className="quarter right">
            {board.slice(6, 12).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[0] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lower-board">
          <div className="quarter left">
            {board.slice(12, 18).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[1] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bar"></div>
          <div className="quarter right">
            {board.slice(18).map(stack => (
              <div
                key={stack.position}
                className={`stack ${stack.color}`}
                onClick={() => handleMove(stack.position, stack.position + (selectedDice[1] || 0))}
              >
                {stack.count > 0 && (
                  <div className="pieces">
                    {Array.from({ length: stack.count }).map((_, index) => (
                      <div key={index} className="piece"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="bear-off">
          <div className="bear-off-cell black"></div>
          <div className="bear-off-cell white"></div>
        </div>
        <div className="dice-area">
          <Dice dice={dice} rollDice={rollDice} onDiceClick={handleDiceClick} />
          <div className="turn">{isBlackTurn ? 'Black Turn' : 'White Turn'}</div>
        </div>
      </div>
    </div>
  );
};

export default Backgammon;
>>>>>>> e295459 (Initial commit)
