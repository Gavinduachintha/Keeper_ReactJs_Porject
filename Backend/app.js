import express from "express";
import axios from "axios";
import db from "./db.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(cors());

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
  const { notenumber, notecontent } = req.body;
  if (!notenumber || !notecontent) {
    return res
      .status(400)
      .json({ error: "Notenumber and the notecontent are required" });
  }
  try {
    const result = await db.query(
      "INSERT INTO notes (notenumber, notecontent) VALUES ($1,$2) RETURNING",
      [notenumber, notecontent]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servers is running on http://localhost:${port}`);
});
