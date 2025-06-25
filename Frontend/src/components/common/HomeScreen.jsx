import React from 'react';
import '../../styles/components/HomeScreen.css';

const HomeScreen = ({ onSelect }) => {
  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
              stroke="#6B21A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="#6B21A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 13H8"
              stroke="#6B21A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17H8"
              stroke="#6B21A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9H8"
              stroke="#6B21A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>NoteSync</span>
        </div>
        <div className="nav-actions">
          <button className="btn-signin" onClick={() => onSelect('login')}>Sign In</button>
          <button className="btn-signup" onClick={() => onSelect('signup')}>Sign Up</button>
        </div>
      </nav>
      <div className="home-screen">
        <main className="home-main">
          <div className="home-content">
            <h1 className="home-title">
              Capture your ideas, <br />
              <span className="highlight">anytime, anywhere.</span>
            </h1>
            <p className="home-description">
              NoteSync helps you organize your thoughts, save important information, and keep track of your tasks in one beautiful place. Access your notes from any device, anytime.
            </p>
            <div className="home-buttons">
              <button className="btn btn-primary" onClick={() => onSelect('signup')}>Get Started Free</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="home-image">
            <img src="/app-preview.png" alt="App Preview" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeScreen; 