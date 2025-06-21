import React from "react";
import "../../styles/global/note.css";

const Note = (props) => {
  const createOn = new Date().toLocaleDateString();

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.id);
    }
  };

  return (
    <div className="noteComponent">
      <h3>{props.title}</h3>
      <p className="note-content">{props.content}</p>
      <div className="bottom-row">
        <p className="date">
          {props.date ? new Date(props.date).toLocaleString() : "No Date"}
        </p>

        <button onClick={()=>props.onEdit && props.onEdit()}>
          <img
            src="src/styles/assets/images/edi.png"
            alt="edit"
            
          />
        </button>
        <button onClick={handleDelete}>
          <img src="src/styles/assets/images/delete.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default Note;
