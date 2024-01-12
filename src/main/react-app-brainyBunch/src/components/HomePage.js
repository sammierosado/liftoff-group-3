import React from "react";
import "../css/homePage.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function HomePage() {
  return (
    <div className="homePage">
      <div>
        {/* <span className="nav_routes"> */}
        <Navigation />
        {/* </span> */}
      </div>
    </div>
  );
}

export default HomePage;
