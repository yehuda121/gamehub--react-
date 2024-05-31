// GamesHome.js

import React from 'react';
import { Link } from 'react-router-dom';
import './GameHome.css'; // Import your CSS file

function GamesHome() {
  return (
    <div className="games-container">
      <h2 className="games-title">Choose a Game</h2>
      <div className="game-buttons">
        <Link to="/Minesweeper" className="game-button">
          Minesweeper
        </Link>
        <Link to="/Backgammon" className="game-button">
          Backgammon
        </Link>
        <Link to="/Snake" className="game-button">
          Snake
        </Link>
      </div>
    </div>
  );
}

export default GamesHome;
