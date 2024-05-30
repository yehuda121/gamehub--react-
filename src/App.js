// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js


import React, { useState } from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GamesHome from './components/games/GamesHome';
import Login from './components/Login';
import Minesweeper from './components/games/Minesweeper';
import Backgammon from './components/games/Backgammon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing routes */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/GamesHome" element={<GamesHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Minesweeper" element={<Minesweeper />} />
        <Route path="/Backgammon" element={<Backgammon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


