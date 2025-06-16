import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "./header.jsx";
import Note from "./note.jsx";
import Footer from "./footer.jsx";
import Addnote from "./addnote.jsx";
import "../assets/app.css";
import LoginPage from "./Login.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId,setUserId]=useState(null)
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("http://localhost:3000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched notes in App.jsx:", data); // Log the fetched notes
        setNotes(data);
      })
      .catch((err) => console.error("Error fetching notes: ", err));
  }, [isLoggedIn, userId]);
  const closePopup = () => {
    setPopupOpen(false);
    setEditNote(null);
  };
  const addNote = async (newNote) => {
    try {
      if (newNote.id) {
        // EDIT existing note
        const res = await fetch(
          `http://localhost:3000/api/notes/${newNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...newNote,userId}),
          }
        );

        if (!res.ok) throw new Error("Failed to update note");
        const updatedNote = await res.json();

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )
        );
        toast.success("Note updated!");
      } else {
        // ADD new note
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(...newNote,userId),
        });

        if (!res.ok) throw new Error("Failed to save note");
        const savedNote = await res.json();
        setNotes((prevNotes) => [...prevNotes, savedNote]);
        toast.success("Note added!");
      }
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

  const handdleEditNote = async (note) => {
    setEditNote(note);
    setPopupOpen(true);
  };

  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };
  const hadleLogout = () => {
    localStorage.removeItem("rememberedEmail");
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Header onLogout={hadleLogout} />
          {/* <Header/> */}
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
                onEdit={() => handdleEditNote(noteItem)}
              />
            ))}
          </div>
          <button className="add-button" onClick={() => setPopupOpen(true)}>
            Add +
          </button>
          <Addnote
            isOpen={isPopupOpen}
            onClose={closePopup}
            onAddNote={addNote}
            editingNote={editNote}
          />
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
