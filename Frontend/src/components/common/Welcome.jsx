// components/WelcomePage.jsx
import React from "react";
import "../../styles/global/welcome.css"; // optional for styling

const WelcomePage = ({ onSelect }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to NoteNest 📝</h1>
        <p className="welcome-description">
          A clean and secure note-taking app. Sign up to get started or log in
          if you already have an account.
        </p>
        <div className="welcome-buttons">
          <button
            className="welcome-button login"
            onClick={() => onSelect("login")}
          >
            Log In
          </button>
          <button
            className="welcome-button signup"
            onClick={() => onSelect("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="welcome-footer">
        © 2025 NoteNest. All rights reserved.
      </div>
    </div>
  );
};

export default WelcomePage;
