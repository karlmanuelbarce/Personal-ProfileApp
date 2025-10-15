import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    colors: isDarkMode
      ? {
          background: "#121212",
          text: "#FFFFFF",
          card: "#1E1E1E",
          primary: "#BB86FC",
        }
      : {
          background: "#f8f9fa",
          text: "#000000",
          card: "#FFFFFF",
          primary: "#3498DB",
        },
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
