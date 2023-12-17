import React, { useState } from "react";
import "../css/loginPage.css";
import { json } from "react-router";

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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

      const data = await response.json();
      if (response.ok) {
        document.location.href = "/user";
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>User Login</h1>
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
  );
}

export default Login;
