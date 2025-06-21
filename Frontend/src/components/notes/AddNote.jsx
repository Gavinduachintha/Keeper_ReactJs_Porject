import React, { useEffect, useState } from "react";
import "../../styles/global/addnote.css";

const AddNote = ({ isOpen, onClose, onAddNote, editingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Prefill fields when editingNote is set
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.notecontent);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const noteData = {
        title: title.trim(),
        notecontent: content.trim(),
      };

      if (editingNote?.id) {
        noteData.id = editingNote.id; // Include ID for editing
      }

      onAddNote(noteData); // Same function handles both add and edit
      setTitle("");
      setContent("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="top-layer">
          <h2>{editingNote ? "Edit Note" : "Add a new note"}</h2>
          <button className="close-button" onClick={onClose}>
            <img src="src/styles/assets/images/close.png" alt="close" />
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
            {editingNote ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
