import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggleButton.css';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <label className="theme-switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeToggleButton; 