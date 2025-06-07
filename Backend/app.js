import express from "express";
import axios from "axios";
import db from "./db.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes ORDER BY id DESC");
    console.log(result.rows);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, notecontent } = req.body;
  if (!title || !notecontent) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO notes (title, notecontent,created_at) VALUES ($1, $2) RETURNING *",
      [title, notecontent,]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting note:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted", deletedNote: result.rows[0] });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servers is running on http://localhost:${port}`);
});
