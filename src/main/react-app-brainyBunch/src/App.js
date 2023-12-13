import logo from './logo.svg';
import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LikedSongs from "./components/LikedSongs";



function App() {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/likedsongs" element={<LikedSongs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



