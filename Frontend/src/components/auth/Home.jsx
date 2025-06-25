import React from 'react'
import '../../styles/components/Home.css'

const Home = ({onSelect}) => {
    return (
        <div className="welcome-container">
          <header className="welcome-header">
            <h1>📝 NoteNest</h1>
            <div className="auth-buttons">
              <button onClick={() => onSelect("login")}>Log In</button>
              <button onClick={() => onSelect("signup")}>Sign Up</button>
            </div>
          </header>
          <main className="welcome-main">
            <h2>Stay Organized & Productive</h2>
            <p>A simple and secure note-taking app built with MERN stack.</p>
            <button onClick={() => onSelect("login")}>Get Started</button>
          </main>
        </div>
      );
    };


export default Home