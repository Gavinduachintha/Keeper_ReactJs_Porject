import React from "react";
import "../assets/header.css";

const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <h1>Keeper</h1>
     
      <button className="logout-button" onClick={onLogout}>
        Log out
        <div class="arrow-wrapper">
          <div class="arrow"></div>
        </div>
      </button>
    </div>
  );
};

export default Header;
