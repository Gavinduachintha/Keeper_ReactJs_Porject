import React from "react";
import ThemeToggleButton from "../common/ThemeToggleButton";
import "../../styles/global/header.css";

const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <h1>Keeper</h1>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <ThemeToggleButton />
        <button className="logout-button" onClick={onLogout}>
          Log out
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
