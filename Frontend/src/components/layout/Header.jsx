import React, { useState } from "react";
import ThemeToggleButton from "../common/ThemeToggleButton";
import Sidebar from "./Sidebar";
import Backdrop from "../common/Backdrop";
import "../../styles/global/header.css";

const Header = ({ onLogout, onNavigate }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="header">
        <button className="hamburger-button" onClick={toggleSidebar}>
          &#9776; {/* Hamburger Icon */}
        </button>
        <h1>Keeper</h1>
        {/* The div that contained the buttons is removed, as they will be in the sidebar. */}
      </div>
      {isSidebarOpen && <Backdrop onClick={toggleSidebar} />}
      <Sidebar isOpen={isSidebarOpen}>
        <a onClick={() => { onNavigate('notes'); toggleSidebar(); }}>Notes</a>
        <a onClick={() => { onNavigate('about'); toggleSidebar(); }}>About Us</a>
        <ThemeToggleButton />
        <button className="logout-button" onClick={() => { onLogout(); toggleSidebar(); }}>
          Log out
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
      </Sidebar>
    </>
  );
};

export default Header;
