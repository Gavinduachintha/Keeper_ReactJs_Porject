import Header from "./header.jsx";
import Note from "./note.jsx";
import Footer from "./footer.jsx";
import "./App.css";
import { useEffect, useState } from "react";
import Addnote from "./addnote.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched notes in App.jsx:", data); // Log the fetched notes
        setNotes(data);
      })
      .catch((err) => console.error("Error fetching notes: ", err));
  }, []);
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
            key={noteItem.id}
            title={noteItem.notenumber}
            content={noteItem.notecontent}
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
