import React from 'react';
import '../../styles/components/NotesHeader.css';

const NotesHeader = ({ notesCount, onNewNoteClick }) => {
  return (
    <div className="notes-header">
      <div className="notes-title-section">
        <h2 className="notes-title">Your Notes</h2>
        <p className="notes-count">{notesCount} notes available</p>
      </div>
      <button className="new-note-btn" onClick={onNewNoteClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>New Note</span>
      </button>
    </div>
  );
};

export default NotesHeader; 