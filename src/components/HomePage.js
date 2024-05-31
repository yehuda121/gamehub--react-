// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function Homepage() {
  return (
    <div className="homepage">
      <h1 className="title">Welcome to the Gamehub</h1>
      <div className="button-container">
        <Link to="/Login">
          <button className="homepage-button">Login</button>
        </Link>
        <Link to="/GamesHome">
          <button className="homepage-button">Games</button>
        </Link>
        <Link to="/CalculatorsHome">
          <button className="homepage-button">Calculators</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
