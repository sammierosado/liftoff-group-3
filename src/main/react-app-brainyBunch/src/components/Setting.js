import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";

import "../css/setting.css";

const Settings = () => {
  const darkMode = localStorage.getItem("spotify-mode");
  const fontSize = localStorage.getItem("spotify-font-size");

  const [themeCheckedValue, setThemeCheckedValue] = useState(
    darkMode === "dark" ? "dark" : "light"
  );
  const [styleCheckedValue, setStyleCheckedValue] = useState(
    fontSize ? fontSize : "fsNormal"
  );

  const themeHandler = (event) => {
    localStorage.setItem("spotify-mode", event.target.value);

    setThemeCheckedValue(event.target.value);
  };

  const fontSizeHandler = (event) => {
    localStorage.setItem("spotify-font-size", event.target.value);

    setStyleCheckedValue(event.target.value);
  };

  useEffect(() => {
    var bodyClasses =
      (darkMode === "light" ? "" : "dark") +
      " " +
      (fontSize ? fontSize : "fsNormal");

    document.body.className = bodyClasses;
  });

  return (
    <div className="settings">
      <Navigation />
      <div className="row">
        <div className="setting-label">
          <h2>Theme:</h2>
        </div>
        <div className="modeRadioGroup" onChange={themeHandler}>
          <div className="light">
            <input
              type="radio"
              id="theme-light"
              name="theme"
              value="light"
              defaultChecked={themeCheckedValue === "light"}
            />
            <label htmlFor="theme-light">Light</label>
          </div>
          <div className="dark">
            <input
              type="radio"
              id="theme-dark"
              name="theme"
              value="dark"
              defaultChecked={themeCheckedValue === "dark"}
            />
            <label htmlFor="theme-dark">Dark</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="setting-label">
          <h2>Style:</h2>
        </div>
        <div className="fontRadioGroup" onChange={fontSizeHandler}>
          <div className="small">
            <input
              type="radio"
              id="option-one"
              name="fontStyle"
              value="fsSmall"
              defaultChecked={styleCheckedValue === "fsSmall"}
            />
            <label htmlFor="option-one">A-</label>
          </div>
          <div className="normal">
            <input
              type="radio"
              id="option-two"
              name="fontStyle"
              value="fsNormal"
              defaultChecked={styleCheckedValue === "fsNormal"}
            />
            <label htmlFor="option-two">A </label>
          </div>
          <div className="big">
            <input
              type="radio"
              id="option-three"
              name="fontStyle"
              value="fsBig"
              defaultChecked={styleCheckedValue === "fsBig"}
            />
            <label htmlFor="option-three">A+</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
