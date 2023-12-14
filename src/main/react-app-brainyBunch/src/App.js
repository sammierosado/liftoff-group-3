import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LikedSongs from "./components/LikedSongs";
import RandomMusicPage from "./components/RandomMusicPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/likedsongs" element={<LikedSongs />} />
          <Route path="/RandomMusic" element={<RandomMusicPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
