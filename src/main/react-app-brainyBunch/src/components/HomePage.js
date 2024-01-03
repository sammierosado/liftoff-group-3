import React from "react";
import "../css/homePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homePage">
      <div className="nav">
        <span className="nav_routes">
          <Link to="/register">Register User</Link>&nbsp;&nbsp;
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default HomePage;
