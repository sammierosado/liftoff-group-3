import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LikedSongs from "./components/LikedSongs";
import Login from "./components/Login";
import Register from "./components/Register";
import RandomMusicPage from "./components/RandomMusicPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/likedsongs" element={<LikedSongs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/randompage" element={<RandomMusicPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
