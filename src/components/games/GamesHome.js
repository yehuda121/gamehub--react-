//GamesHomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function GamesHome() {
  return (
    <div>
      <h2>Choose a Game</h2>
      <Link to="/Minesweeper">
        <button>Minesweeper</button>
      </Link>
      <Link to="/Backgammon">
        <button>Backgammon</button>
      </Link>
      
    </div>
  );
}

export default GamesHome;
