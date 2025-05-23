import React from "react";
import "./note.css";
const Note = (props) => {
  const createOn = new Date().toLocaleDateString();
  return (
    <div className="noteComponent">
      <h3>Note {props.number}</h3>
      <p>{props.Notebody}</p>
      <div className="bottom-row">
        <p className="date">{createOn}</p>
        <button><img src="src/assets/delete.png"></img></button>
        
      </div>
    </div>
  );
};

export default Note;
