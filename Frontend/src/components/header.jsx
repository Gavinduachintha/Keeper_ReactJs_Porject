import React from "react";
import "../assets/header.css";

const Header = ({onLogout}) => {
  return (
    <div className="header">
      <h1>Keeper</h1>
      <button className="logout" onClick={onLogout}>LogOut</button>
    </div>
  );
};

export default Header;
