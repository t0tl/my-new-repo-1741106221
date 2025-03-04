import React, { createContext, useContext, useState } from 'react';

interface Theme {
  primary: string;
  background: string;
  cardBackground: string;
  text: string;
}

const lightTheme: Theme = {
  primary: '#1A237E',
  background: '#F5F5F5',
  cardBackground: '#FFFFFF',
  text: '#000000',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);