# 🗄️ Database Setup Guide

## 📋 **Prerequisites**

1. **PostgreSQL** installed and running on your system
2. **Node.js** and **npm** installed
3. **Project dependencies** installed

## 🔧 **Step 1: Create Environment File**

Create a `.env` file in the `Backend` directory:

```bash
# Navigate to Backend directory
cd Backend

# Create .env file (Windows)
echo. > .env

# Or on macOS/Linux
touch .env
```

**Add this content to `Backend/.env`:**
```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=keeper_notes
DB_PASSWORD=your_actual_password_here
DB_PORT=5432

# Optional Pool Settings
DB_MAX_CONNECTIONS=20
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 🗄️ **Step 2: Create Database**

Connect to PostgreSQL and create the database:

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE keeper_notes;

-- Connect to the new database
\c keeper_notes

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    notecontent TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color VARCHAR(7) DEFAULT '#4f46e5',
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at DESC);

-- Verify tables
\dt

-- Exit PostgreSQL
\q
```

## 🚀 **Step 3: Test Database Connection**

```bash
# From the root directory
npm run dev:backend

# Or from Backend directory
npm run dev
```

**Expected output:**
```
✅ Successfully connected to PostgreSQL database
📊 Database: keeper_notes on localhost:5432
🚀 Server is running on http://localhost:3000
```

## 🔍 **Troubleshooting**

### **Connection Error: "client password must be a string"**
- ✅ Check that `DB_PASSWORD` is set in `.env` file
- ✅ Verify PostgreSQL is running
- ✅ Confirm password is correct

### **Connection Error: "database does not exist"**
- ✅ Create the database: `CREATE DATABASE keeper_notes;`
- ✅ Check `DB_NAME` in `.env` file

### **Connection Error: "role does not exist"**
- ✅ Verify PostgreSQL user exists
- ✅ Check `DB_USER` in `.env` file
- ✅ Create user if needed: `CREATE USER postgres WITH PASSWORD 'password';`

### **Permission Denied**
- ✅ Check PostgreSQL authentication settings in `pg_hba.conf`
- ✅ Verify user has access to database

## 📊 **Database Schema**

### **Users Table**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Notes Table**
```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    notecontent TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color VARCHAR(7) DEFAULT '#4f46e5',
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔧 **Advanced Configuration**

### **Connection Pool Settings**
```env
DB_MAX_CONNECTIONS=20        # Maximum connections in pool
DB_IDLE_TIMEOUT=30000        # Close idle connections after 30s
DB_CONNECTION_TIMEOUT=2000   # Connection timeout in ms
```

### **Environment Variables**
```env
NODE_ENV=development         # Enable development features
PORT=3000                   # Server port
```

## 🧪 **Testing the API**

Once the server is running, test the endpoints:

```bash
# Test signup
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 **Notes**

- The database automatically connects when the server starts
- Connection pool handles multiple concurrent requests efficiently
- Slow queries (>100ms) are logged in development mode
- Graceful shutdown closes database connections properly
- Error handling provides detailed feedback for troubleshooting 