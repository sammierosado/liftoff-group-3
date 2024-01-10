import React, { useState, useEffect } from "react";
import "../css/userProfile.css";
import { CgProfile } from "react-icons/cg";
import Navigation from "./Navigation";
import { MdEdit } from "react-icons/md";
import { json } from "react-router-dom";

function UserProfile() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageSource, setImageSource] = useState();
  const username = localStorage.getItem("username");
  const [user, setUser] = useState({});
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      fetch("http://localhost:8080/uploadImage/" + username, {
        method: "post",
        body: formData,
      })
        .then((response) => response.text())
        .then((message) => {
          console.log(message);
          window.location.reload(true);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const loadProfileImage = async () => {
    const username = localStorage.getItem("username");
    const response = await fetch(
      `http://localhost:8080/profileImage/${username}`
    );
    if (!response.ok) {
      setImageSource(null);
    } else {
      console.log(response);
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageSource(imageObjectURL);
    }
  };

  useEffect(() => {
    console.log(username);

    const userProfile = async () => {
      const response = await fetch(
        "http://localhost:8080/userProfile/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const userData = await response.json();
      setUser(userData);
      console.log(userData);

      if (response.ok) {
        localStorage.setItem("username", username);
        setIsLoading(false);
      } else {
        setErrorMessage(userData.errorMessage);
        setIsLoading(false);
      }
    };
    userProfile();

    if (!imageSource) {
      loadProfileImage();
    }
  }, [imageSource]);

  const saveData = async (e) => {
    e.preventDefault();
    const requestBody = {
      username: user.username,
      pronoun: user.pronoun,
      email: user.email,
    };
    const response = await fetch(
      "http://localhost:8080/userProfile/" + username,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const responseData = await response.json();
    console.log(responseData.errorMessage);
    if (response.ok) {
      localStorage.setItem("username", user.username);
      document.location.href = "/user";
    } else {
      setErrorMessage(responseData.errorMessage);
    }
    setIsEditEnable(false);
  };

  const editProfileHandler = () => {
    setIsEditEnable(true);
  };

  const cancelEdit = () => {
    window.location.href = "/user";
  };

  const handleChange = (field, value) => {
    let updatedUser = { ...user };
    updatedUser[field] = value;
    setUser(updatedUser);
  };

  return (
    <div>
      <div>
        <div>
          <Navigation />
        </div>
      </div>
      <div className="userProfile-nav">
        <h2>Welcome! {username}</h2>
      </div>
      <div className="img-div">
        <div className="w50">
          {imageSource && (
            <img
              src={imageSource}
              className="profile_image"
              alt="Profile Photo"
            />
          )}
          {!imageSource && <CgProfile />}
          {imageSource && <h4>Change profile image</h4>}
          {!imageSource && <h4>Upload Image:</h4>}
          <input type="file" onChange={handleFileChange} />
          <img src={file} />
          <button onClick={handleImageUpload}>Upload</button>
        </div>
        <div className="w50">
          <h2>
            User Profile
            {!isEditEnable && (
              <span onClick={editProfileHandler} className="editIcon">
                <MdEdit />
              </span>
            )}
          </h2>
          {!isEditEnable && (
            <table className="align">
              <tbody>
                <tr>
                  <td>Username: </td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td>Email: </td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Pronoun: </td>
                  <td>{user.pronoun}</td>
                </tr>
              </tbody>
            </table>
          )}
          {isEditEnable && (
            <div className="register-form">
              <div className="username form-group">
                <label for="username">Username </label>
                <input
                  type="text"
                  value={user.username}
                  id="username"
                  placeholder="Username"
                  readOnly={true}
                />
              </div>
              <div className="pronoun form-group">
                <label for="pronoun">Pronoun </label>
                <select
                  className="select"
                  value={user.pronoun}
                  id="pronoun"
                  placeholder="Pronoun"
                  onChange={(e) => handleChange("pronoun", e.target.value)}
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
                  id="email"
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="password form-group">
                <label for="password">Password </label>
                <input
                  type="password"
                  value={user.password}
                  id="password"
                  placeholder="Password"
                  readOnly={true}
                />
              </div>
              <div className="footer">
                <button
                  type="submit"
                  onClick={saveData}
                  className="save_button"
                >
                  Save
                </button>
                <button onClick={cancelEdit} className="cancel_button">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
