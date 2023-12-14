import React, { useState } from "react";
import "../css/loginPage.css";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>User Login</h1>
        <div className="email form-group">
          <label for="email">Email </label>
          <input
            type="text"
            value={email}
            onChange={(e) => handleInputChange(e)}
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="password form-group">
          <label for="password">Password </label>
          <input
            type="text"
            value={password}
            onChange={(e) => handleInputChange(e)}
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="footer">
          <button type="submit" className="login_btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
