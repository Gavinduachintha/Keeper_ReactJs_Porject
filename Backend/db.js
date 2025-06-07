import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "Noteapp",
  password: "Lagare123",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error:", err));

export default {
  query: (text, params) => pool.query(text, params),
};
