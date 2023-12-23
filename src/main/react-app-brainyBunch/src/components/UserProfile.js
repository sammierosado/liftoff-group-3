import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/userProfile.css";
function UserProfile() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const userProfile = async () => {
      const response = await fetch(
        "http://localhost:8080/userProfile/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("username", username);
        setIsLoading(false);
      } else {
        setErrorMessage(data.errorMessage);
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      if (isLoading) {
        userProfile();
      }
    }, []);
  });

  return (
    <div className="userProfile">
      <h2>Welcome! {username}</h2>
      <div className="nav">
        <span className="nav_routes">
          <Link to={`/${username}/editProfile`}>Edit User Profile</Link>
          &nbsp;&nbsp;
          <Link to="/userCollection">User Collection</Link>
          &nbsp;&nbsp;
          <Link to="/searchMusic">Find Music</Link>
        </span>
      </div>
    </div>
  );
}
export default UserProfile;
