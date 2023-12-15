import React, { useState } from "react";
import axios from "axios";
import "../css/registerPage.css";
import { json, redirect } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    pronoun: "",
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    let updatedUser = { ...user };
    if (field === "username") {
      updatedUser.username = value;
    }
    if (field === "pronoun") {
      updatedUser.pronoun = value;
    }
    if (field === "email") {
      updatedUser.email = value;
    }
    if (field === "password") {
      updatedUser.password = value;
    }
    setUser(updatedUser);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        document.location.href="/"; 
      })
      .catch((error) => {
        alert(error);
      });
  };
  console.log(user);
  return (
    <div className="register">
      <div>
        <h1>User Registration</h1>
        <div className="register-form">
          <div className="username form-group">
            <label for="username">Username </label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => handleChange("username", e.target.value)}
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="pronoun form-group">
            <label for="pronoun">Pronoun </label>
            <input
              type="text"
              value={user.pronoun}
              onChange={(e) => handleChange("pronoun", e.target.value)}
              id="pronoun"
              placeholder="Pronoun"
            />
          </div>
          <div className="email form-group">
            <label for="email">Email </label>
            <input
              type="text"
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="password form-group">
            <label for="password">Password </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => handleChange("password", e.target.value)}
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="footer">
            <button onClick={saveUser} type="submit" className="register_btn">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
