import React, { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Ensure you have these icons installed

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Apply the theme class to the body or root element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-dark", "text-white"); // Dark theme classes
      document.body.classList.remove("bg-light", "text-dark"); // Light theme classes
    } else {
      document.body.classList.add("bg-light", "text-dark"); // Light theme classes
      document.body.classList.remove("bg-dark", "text-white"); // Dark theme classes
    }
  }, [isDarkMode]);

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="btn btn-link"
        aria-label="Toggle theme">
        {isDarkMode ? (
          <MdLightMode className={`fs-5 me-3`} />
        ) : (
          <MdDarkMode className={`fs-5 me-3`} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
