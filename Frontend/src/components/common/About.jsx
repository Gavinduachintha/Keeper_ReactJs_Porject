import React from "react";
import "../../styles/components/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>🧾 About Us</h2>
      <p>
        Welcome to <strong>NoteNest</strong> — a simple and secure note-taking app built with
        modern web technologies to help you stay organized and productive.
      </p>
      <p>
        This application is designed and developed by a passionate computer science
        student who believes in combining <strong>clean design</strong>, <strong>powerful functionality</strong>,
        and <strong>seamless user experience</strong>.
      </p>
      <p>
        🛠️ <strong>Built with the PERN Stack</strong>: PostgreSQL, Express.js, React, and Node.js. The app
        features responsive design, theme switching, and user authentication.
      </p>
      <p>
        🎨 <strong>UI & Design</strong>: Many UI elements are inspired by or adapted from{" "}
        <a href="https://uiverse.io" target="_blank" rel="noopener noreferrer">
          UIverse
        </a> — a fantastic open-source platform. Thanks to the UIverse community for
        their creative contributions!
      </p>
      <p>
        🙌 <strong>Built With ❤️</strong>: This app was created out of a love for coding,
        learning, and solving real-world problems. Feedback, suggestions, and
        contributions are always welcome!
      </p>
    </div>
  );
};

export default About;
