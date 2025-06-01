import React, { useState } from "react";
import "./addnote.css";

const Addnote = ({ isOpen, onClose, onAddNote }) => {
  if (!isOpen) return null; //To avoid rendering the content when the pop is not opened
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddNote({ title, content });
      setTitle("");
      setContent("");
      onClose();
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add a new note</h2>
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
          <button type="submit" className="submit-button">Add Note</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Addnote;
