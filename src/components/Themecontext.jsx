import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useLocalStorage("invoice-dark-mode", false);
  const toggle = () => setDark((d) => !d);
  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Returns a resolved color based on current theme
export function useColors() {
  const { dark } = useTheme();
  return {
    bg: dark ? "#141625" : "#F8F8FB",
    surface: dark ? "#1E2139" : "#FFFFFF",
    surface2: dark ? "#252945" : "#F9FAFE",
    border: dark ? "#252945" : "#DFE3FA",
    text: dark ? "#FFFFFF" : "#0C0E16",
    textMuted: dark ? "#DFE3FA" : "#888EB0",
    textSecondary: dark ? "#888EB0" : "#7E88C3",
    inputBg: dark ? "#1E2139" : "#FFFFFF",
    cardBorder: dark ? "#252945" : "#F3F3F8",
    sidebar: dark ? "#1E2139" : "#373B53",
    amountDue: dark ? "#0C0E16" : "#0C0E16",
  };
}