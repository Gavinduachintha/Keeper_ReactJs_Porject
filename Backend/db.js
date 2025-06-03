import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "db name",
  password: "db password",
  port: db port,
});
db.connect();

export default db;
