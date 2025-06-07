import React from "react";
import "./note.css";
const Note = (props) => {
  const createOn = new Date().toLocaleDateString();

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.id);
    }
  };

  return (
    <div className="noteComponent">
      <h3>Note {props.title}</h3>
      <p className="note-content">{props.content}</p>
      <div className="bottom-row">
        <p className="date">{createOn}</p>
        <button onClick={handleDelete}>
          <img src="src/assets/delete.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};


export default Note