import React, { useState } from "react";

import "../assets/addnote.css";

const Addnote = ({ isOpen, onClose, onAddNote }) => {
  if (!isOpen) return null; //To avoid rendering the content when the pop is not opened
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddNote({ title: title.trim(), notecontent: content.trim() });
      setTitle("");
      setContent("");
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="top-layer">
          <h2>Add a new note</h2>
          <button className="close-button" onClick={onClose}>
            <img src="src/assets/close.png"></img>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="note-title">Title</label>
            <input
              type="text"
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
// console.log("Saved note from backend:", savedNote);

export default Addnote;
