import Header from "./header.jsx";
import Note from "./note.jsx";
import Footer from "./footer.jsx";

import "./App.css";
import { useState } from "react";
import Addnote from "./addnote.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const closePopup = () => {
    setPopupOpen(false);
  };
  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, { ...newNote, key: Date.now() }]);
  };
  return (
    <>
      <Header />
      <div className="notes-container">
        {notes.map((noteItem) => (
          <Note
            key={noteItem.key}
            title={noteItem.title}
            content={noteItem.content}
          />
        ))}
      </div>
      <button className="add-button" onClick={() => setPopupOpen(true)}>
        +
      </button>
      <Addnote isOpen={isPopupOpen} onClose={closePopup} onAddNote={addNote} />
      <Footer />
    </>
  );
}

export default App;
