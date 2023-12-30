import React from "react";
import "../css/homePage.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function HomePage() {
  return (
    <div className="homePage">
      <div className="nav">
        <h1 className="heading">Welcome to my website</h1>
        <span className="nav_routes">
          {/* <Link to="/register">Register User</Link>&nbsp;&nbsp;
          <Link to="/login">Login</Link> */}
          <Navigation />
        </span>
      </div>
      <p>Here's some content for the homepage</p>
    </div>
  );
}

export default HomePage;
