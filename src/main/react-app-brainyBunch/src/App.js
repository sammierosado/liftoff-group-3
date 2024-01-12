import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";

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
import Setting from "./components/Setting";
import ImagePage from "./components/ImagePage";
import RockDefaultPage from "./components/RockDefaultPage";
import JazzDefaultPage from "./components/JazzDefaultPage";
import RapDefaultPage from "./components/RapDefualtPage";
import Search from "./components/SearchMusic/Search";

function App() {
  const darkMode = localStorage.getItem("spotify-mode");
  const fontSize = localStorage.getItem("spotify-font-size");

  useEffect(() => {
    var bodyClasses =
      (darkMode === "light" ? "" : "dark") +
      " " +
      (fontSize ? fontSize : "fsNormal");

    document.body.className = bodyClasses;
  });

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
          <Route path="/stamplist" element={<StamplistPage />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/imagepage" element={<ImagePage />} />
          <Route path="/rockpage" element={<RockDefaultPage />} />
          <Route path="/jazzpage" element={<JazzDefaultPage />} />
          <Route path="/rappage" element={<RapDefaultPage />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
