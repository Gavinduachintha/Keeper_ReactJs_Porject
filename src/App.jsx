import Header from "./header.jsx";
import Note from "./note.jsx";
import Footer from "./footer.jsx";

import notes from "./notes.js";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="notes-coanitainer">
        {/* <Note
          number="1"
          Notebody="This is the initial note when the note has been created in the react ui components"
        />
        <Note
          number="2"
          Notebody="This is the second example note"
        />
        <Note
          number="3"
          Notebody="This is the third example note"
        /> */}
        {notes.map((noteItem) => (
          <Note
            key={noteItem.key}
            title={noteItem.title}
            content={noteItem.content}
          />
        ))}
      </div>
      <button className="add-button">+</button>

      <Footer />
    </>
  );
}

export default App;
