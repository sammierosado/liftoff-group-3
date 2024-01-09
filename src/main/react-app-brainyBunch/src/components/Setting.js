import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import "../css/setting.css";

const Setting = () => {
  const darkMode = localStorage.getItem("spotify-mode");
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [checkedValue, setCheckedValue] = useState(
    isDarkMode === "true" ? true : false
  );

  const toggleHandler = (event) => {
    setIsDarkMode(event.target.checked);

    if (event.target.checked) {
      localStorage.setItem("spotify-mode", event.target.checked);
    } else {
      localStorage.removeItem("spotify-mode");
    }

    setCheckedValue(event.target.checked);
  };

  return (
    <div>
        <Navigation/>
    <div className="settings">
      <div className="row">
        <div className="label">Theme</div>
        <div className="value">
          <span className="optionText">Light</span>
          <div className="toggleSwitch">
            <label className="toggle">
              <input
                className="toggleCheckbox"
                type="checkbox"
                checked="checkedValue"
                onChange={toggleHandler}
              />
              <div className="toggleSwitch"></div>
            </label>
          </div>
          <span className="optionText">Dark</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Setting;
