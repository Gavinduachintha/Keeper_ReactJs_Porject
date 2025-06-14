import React from "react";
import "../assets/note.css";
const Note = (props) => {
  const createOn = new Date().toLocaleDateString();

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.id);
    }
  };
  const accentColor = props.color || "#4f46e5";
  const backgroundColor = props.bgColor || "#ffffff";
  return (
    <div
      className="noteComponent"
      style={{
        "--accent-color": accentColor,
        "--accent-light": `${accentColor}20`,
        "--accent-lighter": `${accentColor}10`,
        background: backgroundColor,
      }}
    >
      <h3>{props.title}</h3>
      <p className="note-content">{props.content}</p>
      <div className="bottom-row">
        <p className="date">
          {props.date ? new Date(props.date).toLocaleString() : "No Date"}
        </p>

        <button>
          <img
            src="src/assets/edi.png"
            alt="edit"
            
          />
        </button>
        <button onClick={handleDelete}>
          <img src="src/assets/delete.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default Note;
