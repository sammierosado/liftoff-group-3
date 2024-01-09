import React from "react";
import { Form, redirect } from "react-router-dom";
import classes from "../css/navigation.css";

const Navigation = () => {
  const isLoggedIn = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };
  return (
    <header className="main-header">
      <h1>Spotify Music Organizer</h1>
      <nav className="nav">
        <ul>
          {!isLoggedIn && (
            <li>
              <a href="/register">Register</a>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a href="/collections">Collection</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a href="/user">Profile</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a href="/search">Find Music</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a href="/stamplist">Event History</a>
            </li>
          )}{isLoggedIn && (
            <li>
              <a href="/setting">Settings</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              {/* <Form action="/logout" method="post"> */}
              <button onClick={handleLogout}>Logout</button>
              {/* </Form> */}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
