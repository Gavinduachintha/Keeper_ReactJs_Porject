import express from "express";
import db from "./db.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

const colorPalette = [
  "#FFE3A9",
  "#8CCDEB",
  "#FF7601",
  "#C562AF",
  "#FCEF91",
  "#C4E1E6",
  "#EBFFD8",
  "#FFE8CD",
];

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  try {
    const result = await db.query(
      "SELECT id,email FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({
      message: "Login successful",
      userId: result.rows[0].id, // send userId to frontend
    });
  } catch (err) {
    console.error("Login err: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/notes", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: "User id required" });
  }
  try {
    const result = await db.query(
      "SELECT * FROM notes WHERE user_id=$1 ORDER BY id DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/notes", async (req, res) => {
  const randomColor =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];
  const createOn = new Date().toISOString();
  const { title, notecontent, userId } = req.body;
  if (!title || !notecontent || !userId) {
    return res
      .status(400)
      .json({ error: "Title, content and userId are required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO notes (title, notecontent, created_at, color, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, notecontent, createOn, randomColor, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting note:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, notecontent } = req.body;
  if (!title || !notecontent) {
    return res.status(400).json({ message: "Failed to update data" });
  }
  try {
    const result = await db.query(
      "UPDATE notes SET title = $1, notecontent = $2 WHERE id = $3 RETURNING *",
      [title, notecontent, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  console.log(`Server is running on http://localhost:${port}`);
});
