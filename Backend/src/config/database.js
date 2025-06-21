import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the Backend directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Database configuration with fallbacks
const dbConfig = {
  user: process.env.USER || 'postgres',
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE || 'keeper_notes',
  password: process.env.PASSWORD || '',
  port: process.env.PORT || 5432,
};

// Validate required configuration
if (!dbConfig.password) {
  console.error('❌ Database password is required!');
  console.error('Please create a .env file in the Backend directory with:');
  console.error('USER=postgres');
  console.error('HOST=localhost');
  console.error('DATABASE=keeper_notes');
  console.error('PASSWORD=your_actual_password');
  console.error('PORT=5432');
  process.exit(1);
}

const pool = new pg.Pool(dbConfig);

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => {
    console.error("❌ Connection error:", err.message);
    console.error("Please check your database configuration in .env file");
    process.exit(1);
  });

export default {
  query: (text, params) => pool.query(text, params),
};
