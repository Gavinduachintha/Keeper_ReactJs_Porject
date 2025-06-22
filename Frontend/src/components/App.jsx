import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "./layout/Header.jsx";
import Note from "./notes/Note.jsx";
import Footer from "./layout/Footer.jsx";
import AddNote from "./notes/AddNote.jsx";
import About from "./common/About.jsx";
import "../styles/global/App.css";
import LoginPage from "./auth/Login.jsx";
import WelcomePage from "./common/Welcome.jsx";
import Signup from "./auth/Signup.jsx";

function App() {
  const [screen,setScreen]= useState("welcome")
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState('notes');

  useEffect(() => {
    if (!isLoggedIn || !userId) return;
    fetch(`http://localhost:3000/api/notes?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => console.error("Error fetching notes: ", err));
  }, [isLoggedIn, userId]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setEditNote(null);
  };

  const addNote = async (newNote) => {
    try {
      const payload = { ...newNote, userId };

      if (!payload.title || !payload.notecontent) {
        toast.error("Both title and content are required.");
        return;
      }

      if (payload.id) {
        // Edit existing note
        const res = await fetch(
          `http://localhost:3000/api/notes/${payload.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
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
        // Add new note
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to save note");
        }

        const savedNote = await res.json();
        setNotes((prevNotes) => [...prevNotes, savedNote]);
        toast.success("Note added!");
      }
    } catch (err) {
      console.error("Error adding/updating note:", err.message);
      toast.error("Something went wrong. Check console.");
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete note");

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      toast.success("Note deleted!");
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Delete failed.");
    }
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setPopupOpen(true);
  };

  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setScreen("main");
  };


  const handleLogout = () => {
    localStorage.removeItem("rememberedEmail");
    setIsLoggedIn(false);
    setUserId(null);
    setNotes([]);
    setScreen("welcome");
  };
  if (screen === "welcome") {
    return <WelcomePage onSelect={setScreen} />;
  }

  if (screen === "login") {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (screen === "signup") {
    return <Signup onSignupSuccess={handleLoginSuccess} />;
  }

  if (screen === "main" && isLoggedIn) {
    return (
      <>
        {!isLoggedIn ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Header onLogout={handleLogout} onNavigate={handleNavigate} />
            {currentPage === 'notes' ? (
              <>
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
                      onEdit={() => handleEditNote(noteItem)}
                    />
                  ))}
                </div>
                <button className="Btn" onClick={() => setPopupOpen(true)}>
                  Add
                  <svg className="svg" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </button>
                <AddNote
                  isOpen={isPopupOpen}
                  onClose={closePopup}
                  onAddNote={addNote}
                  editingNote={editNote}
                />
              </>
            ) : (
              <About />
            )}
            <Footer />
            <ToastContainer />
          </>
        )}
      </>
    );
  }
}
export default App;
