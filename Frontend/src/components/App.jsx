import Header from "./header.jsx";
import Note from "./note.jsx";
import Footer from "./footer.jsx";
import Addnote from "./addnote.jsx";
import { useEffect, useState } from "react";
import "../assets/app.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editNote, setEditNote] = useState(null)
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
  const addNote = async (newNote) => {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!res.ok) throw new Error("Failed to save note");
      const savedNote = await res.json();
      setNotes((prevNotes) => [...prevNotes, savedNote]);
    } catch (err) {
      console.error("Error adding note: ", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete note");

      // Update the UI
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const editNote= async (id)=>{
    setEditNote(editNote)
  }

  return (
    <>
      <Header />

      <div className="notes-container">
        {notes.map((noteItem) => (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.notecontent}
            date={noteItem.created_at}
            color={noteItem.color}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <button className="add-button" onClick={() => setPopupOpen(true)}>
        Add +
      </button>
      <Addnote isOpen={isPopupOpen} onClose={closePopup} onAddNote={addNote} />
      <Footer />
    </>
  );
}

export default App;
