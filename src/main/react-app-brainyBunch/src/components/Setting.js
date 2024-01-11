import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import "../css/setting.css";

const Setting = () => {
  const darkMode = localStorage.getItem("spotify-mode");

  const fontSize = localStorage.getItem("spotify-font-size");

  const [isFontSize, setIsFontSize] = useState(fontSize);
  const [checkedValue, setCheckedValue] = useState(
    isFontSize ? isFontSize : "fsNormal"
  );
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [modeCheckedValue, setModeCheckedValue] = useState(
    isDarkMode === "true" ? "dark" : "light"
  );

  useEffect(() => {
    var bodyClasses = darkMode === "true" ? "dark" : "";
    bodyClasses = bodyClasses + " " + (fontSize ? isFontSize : "fsNormal");

    document.body.className = bodyClasses;
  });

  const fontSizeHandler = (event) => {
    console.log(event.target.value);
    localStorage.setItem("spotify-font-size", event.target.value);

    var bodyClasses = darkMode === "true" ? "dark" : "";
    bodyClasses = bodyClasses + " " + event.target.value;

    setCheckedValue(event.target.value);

    setIsFontSize(event.target.value);
  };

  const modeHandler = (event) => {
    setIsDarkMode(event.target.value === "dark");

    if (event.target.checked) {
      localStorage.setItem("spotify-mode", event.target.value);

      var bodyClasses = fontSize ? fontSize : "fsNormal";
      bodyClasses = bodyClasses + " " + event.target.value;
      document.body.className = bodyClasses;
    } else {
      localStorage.removeItem("spotify-mode");

      document.body.className = fontSize ? fontSize : "fsNormal";
    }

    setModeCheckedValue(event.target.value);
  };

  return (
    <div>
      <Navigation />
      <div className="settings">
        <div className="radioGroup" onChange={fontSizeHandler}>
          <div className="small">
            <input
              type="radio"
              id="option-one"
              name="selector"
              value="fsSmall"
              checked={checkedValue === "fsSmall"}
            />
            <label htmlFor="option-one">A-</label>
          </div>
          <div className="normal">
            <input
              type="radio"
              id="option-two"
              name="selector"
              value="fsNormal"
              checked={checkedValue === "fsNormal"}
            />
            <label htmlFor="option-two">A</label>
          </div>
          <div className="big">
            <input
              type="radio"
              id="option-three"
              name="selector"
              value="fsBig"
              checked={checkedValue === "fsBig"}
            />
            <label htmlFor="option-three" className="big">
              A+
            </label>
          </div>
        </div>
        <hr />
        {/* // theme  changes*/}
        <div className="modeRadioGroup" onChange={modeHandler}>
          <div className="light">
            <input
              type="radio"
              id="mode-light"
              name="selector"
              value="light"
              checked={modeCheckedValue === "light"}
            />
            <label htmlFor="mode-light">Light</label>
          </div>
          <div className="dark">
            <input
              type="radio"
              id="mode-dark"
              name="selector"
              value="dark"
              checked={modeCheckedValue === "dark"}
            />
            <label htmlFor="mode-dark" className="dark">
              Dark
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
