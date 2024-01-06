import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LikedSongsPage from "./components/LikedSongsPage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import RandomMusicPage from "./components/RandomMusicPage";
import CollectionComponent from "./components/CollectionPage";
import CollectionPage from "./components/CollectionPage";
import StamplistPage from "./components/StamplistPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/likedsongs" element={<LikedSongsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/randompage" element={<RandomMusicPage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/stamplist" element={<StamplistPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
