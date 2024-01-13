import React, { useState } from "react";
import "../css/loginPage.css";
import { json } from "react-router";
import Navigation from "./Navigation";

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(username, password);
  };

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      let loginUser = { username: username, password: password };
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      });
      //fetchimg data from API
      const data = await response.json();
      console.log(data.errorMessage);
      if (response.ok) {
        localStorage.setItem("username", username);
        await createTimestampWithDescription(`User ${username} logged in`, username); // Call the function directly
        window.location.href = "/user";
      } else {
        setErrorMessage(data.errorMessage);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      alert(error);
    }
  };

  const createTimestampWithDescription = async (description, retUser) => {
    try {
      const response = await fetch("http://localhost:8080/stamps/save", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actionDescription: description, // Include the description
          retUser: retUser, // Include retUser in the request body
          // Add other properties as needed
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create timestamp');
      }

      const successMessage = await response.text();
      console.log(successMessage);

      //fetchStamps(); // Refresh the list after successful creation
    } catch (error) {
      console.error('Error creating timestamp:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <Navigation />
        <div className="user-form">
          <h1>User Login</h1>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="username form-group">
            <label for="username">Username </label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e)}
              id="username"
              placeholder="username"
            />
          </div>
          <div className="password form-group">
            <label for="password">Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="footer">
            <button onClick={loginUser} type="submit" className="login_btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
