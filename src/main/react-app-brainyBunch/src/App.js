import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomMusicPage from "./components/RandomMusicPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/RandomMusic" element={<RandomMusicPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
