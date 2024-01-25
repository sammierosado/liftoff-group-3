import React, { useState } from "react";

import axios from "axios";
import "../css/registerPage.css";

function Register() {
  const [user, setUser] = useState({
    username: "",
    pronoun: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [selectOption, setSelectOption] = useState("");

  const handleChange = (field, value) => {
    let updatedUser = { ...user };
    if (field === "username") {
      updatedUser.username = value;
    }
    if (field === "pronoun") {
      setSelectOption(field.value);
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
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data.errorMessage);
      if (response.ok) {
        createTimestampWithDescription(
          "Registered",
          createTimestampWithDescription.retUser
        ); // Call it here
        document.location.href = "/";
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionDescription: description, // Include the description
          retUser: retUser, // Include retUser in the request body
          // Add other properties as needed
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create timestamp");
      }

      const successMessage = await response.text();
      console.log(successMessage);

      //fetchStamps(); // Refresh the list after successful creation
    } catch (error) {
      console.error("Error creating timestamp:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  console.log(user);
  return (
    <div className="register">
      <div>
        <div className="user-form">
          <h1>User Registration</h1>
          {errorMessage && <p className="error">{errorMessage}</p>}
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
              <select
                className="select"
                value={user.pronoun}
                onChange={(e) => handleChange("pronoun", e.target.value)}
                id="pronoun"
                placeholder="Pronoun"
              >
                <option value="">Select</option>
                <option value="he">He/His</option>
                <option value="she">She/Her</option>
                <option value="they">They/Them</option>
              </select>
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
    </div>
  );
}

export default Register;
