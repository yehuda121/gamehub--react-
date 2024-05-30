
// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <h1>Welcome to the Game Center</h1>
      <Link to="/Login">
        <button>login</button>
      </Link>
      <Link to="/GamesHome">
        <button>Games</button>
      </Link>
      <Link to="/CalculatorsHome">
        <button>Calculators</button>
      </Link>
    </div>
  );
}

export default Homepage;
