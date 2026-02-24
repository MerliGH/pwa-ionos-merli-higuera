import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false); 

  //Cargar notas guardadas
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    setLoaded(true); 
  }, []);

  //Guardar solo después de haber cargado
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, loaded]);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>App de notas</h1>
        <p className="subtitle">Guarda tus ideas y recordatorios</p>

        <div className="input-group">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escribe una nota..."
          />
          <button onClick={addNote}>Guardar</button>
        </div>

        <ul>
          {notes.map((n, index) => (
            <li key={index}>
              <span>{n}</span>
              <button
                className="delete-btn"
                onClick={() => deleteNote(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {notes.length === 0 && (
          <p className="empty">No hay notas aún...</p>
        )}
      </div>
    </div>
  );
}

export default App;