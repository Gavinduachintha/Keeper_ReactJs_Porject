import Header from "./header.jsx";
import Note from "./note.jsx";
import Footer from "./footer.jsx";
function App() {
  
  return (
    <>
      <Header />
      <div>
        <Note number="1" Notebody="This is the initial note when the note has been created in the react ui components" />
      </div>

      <Footer />
    </>
  );
}

export default App;
