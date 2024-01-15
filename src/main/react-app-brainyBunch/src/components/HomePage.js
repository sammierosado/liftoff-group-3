import React from "react";
import "../css/homePage.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function HomePage() {
  return (
    <div className="homePage">
      <div>
        <Navigation />
      </div>
      {/* Center the Spotify logo */}
      <div className="centered">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
          alt="Spotify Logo"
        />
      </div>
    </div>
  );
}

export default HomePage;
