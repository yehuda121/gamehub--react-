
import React from 'react';

const Dice = ({ dice, rollDice, onDiceClick }) => {
  return (
    <div className="dice">
      <button onClick={rollDice}>Roll Dice</button>
      <div className="dice-values">
        {dice.map((die, index) => (
          <div key={index} className="die" onClick={() => onDiceClick(die)}>
            {die}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice;
