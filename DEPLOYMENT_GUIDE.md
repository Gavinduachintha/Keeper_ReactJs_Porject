# 🚀 Deployment Guide - Keeper Notes App

## 📋 **Overview**

This guide covers deploying your full-stack Keeper notes application with:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL

## 🎯 **Deployment Options**

### **Option 1: Vercel + Railway (Recommended)**
### **Option 2: Netlify + Railway**
### **Option 3: Heroku (Full Stack)**
### **Option 4: DigitalOcean/AWS (VPS)**

---

## 🚀 **Option 1: Vercel + Railway (Recommended)**

### **Step 1: Deploy Backend to Railway**

1. **Prepare Backend for Production**
   ```bash
   # In Backend directory
   npm install
   ```

2. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project

3. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize Railway project
   cd Backend
   railway init
   
   # Deploy
   railway up
   ```

4. **Set Environment Variables in Railway**
   ```env
   DB_USER=postgres
   DB_HOST=your-railway-db-host
   DB_NAME=your-railway-db-name
   DB_PASSWORD=your-railway-db-password
   DB_PORT=5432
   NODE_ENV=production
   PORT=3000
   ```

5. **Add PostgreSQL Database**
   - In Railway dashboard, add PostgreSQL service
   - Copy connection details to environment variables

### **Step 2: Deploy Frontend to Vercel**

1. **Update Frontend API URLs**
   ```javascript
   // In Frontend/src/services/api.js
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-railway-app.railway.app' 
     : 'http://localhost:3000';
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   cd Frontend
   vercel
   ```

3. **Set Environment Variables in Vercel**
   ```env
   VITE_API_URL=https://your-railway-app.railway.app
   ```

---

## 🌐 **Option 2: Netlify + Railway**

### **Backend (Railway)**
Follow the same steps as Option 1 for backend deployment.

### **Frontend (Netlify)**
1. **Build Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

3. **Set Environment Variables**
   ```env
   VITE_API_URL=https://your-railway-app.railway.app
   ```

---

## ⚡ **Option 3: Heroku (Full Stack)**

### **Step 1: Prepare for Heroku**

1. **Create Procfile in Backend**
   ```bash
   # Backend/Procfile
   web: node src/app.js
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "start": "node src/app.js",
       "dev": "node src/app.js"
     },
     "engines": {
       "node": "18.x"
     }
   }
   ```

3. **Create Heroku App**
   ```bash
   # Install Heroku CLI
   # Create app
   heroku create your-keeper-app
   
   # Add PostgreSQL
   heroku addons:create heroku-postgresql:mini
   ```

4. **Deploy Backend**
   ```bash
   cd Backend
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-keeper-app
   git push heroku main
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DB_USER=your-heroku-db-user
   heroku config:set DB_HOST=your-heroku-db-host
   heroku config:set DB_NAME=your-heroku-db-name
   heroku config:set DB_PASSWORD=your-heroku-db-password
   heroku config:set DB_PORT=5432
   ```

6. **Deploy Frontend**
   ```bash
   cd Frontend
   npm run build
   # Deploy dist folder to Heroku or separate hosting
   ```

---

## 🖥️ **Option 4: DigitalOcean/AWS (VPS)**

### **Step 1: Set Up VPS**

1. **Create Droplet/EC2 Instance**
   - Ubuntu 20.04 LTS
   - 1GB RAM minimum
   - Install Node.js, PostgreSQL, Nginx

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Install Nginx
   sudo apt install nginx
   ```

### **Step 2: Set Up Database**

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE keeper_notes;
CREATE USER keeper_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE keeper_notes TO keeper_user;
\q
```

### **Step 3: Deploy Application**

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/keeper.git
   cd keeper
   ```

2. **Set Up Backend**
   ```bash
   cd Backend
   npm install
   
   # Create .env file
   nano .env
   ```

3. **Set Up Frontend**
   ```bash
   cd ../Frontend
   npm install
   npm run build
   ```

4. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/keeper
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /var/www/keeper/Frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Set Up PM2**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start backend
   cd Backend
   pm2 start src/app.js --name "keeper-backend"
   pm2 startup
   pm2 save
   ```

---

## 🔧 **Production Configuration**

### **Environment Variables**

Create `.env` files for production:

**Backend/.env**
```env
NODE_ENV=production
PORT=3000
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
DB_MAX_CONNECTIONS=20
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000
```

**Frontend/.env**
```env
VITE_API_URL=https://your-backend-url.com
```

### **Security Considerations**

1. **CORS Configuration**
   ```javascript
   // Backend/src/app.js
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://your-frontend-domain.com'] 
       : ['http://localhost:5173'],
     credentials: true
   }));
   ```

2. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Helmet for Security Headers**
   ```bash
   npm install helmet
   ```

### **Database Migration**

```sql
-- Create tables in production database
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    notecontent TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color VARCHAR(7) DEFAULT '#4f46e5',
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at DESC);
```

---

## 📊 **Monitoring & Maintenance**

### **Health Checks**
```javascript
// Backend/src/app.js
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: db.getConnectionStatus()
  });
});
```

### **Logging**
```bash
# Install winston for logging
npm install winston
```

### **Backup Strategy**
```bash
# Database backup script
pg_dump -h your_host -U your_user -d keeper_notes > backup.sql
```

---

## 🚀 **Quick Deploy Commands**

### **Vercel + Railway (Recommended)**
```bash
# Backend
cd Backend
railway up

# Frontend  
cd Frontend
vercel --prod
```

### **Heroku**
```bash
# Backend
cd Backend
heroku create your-app-name
git push heroku main

# Frontend
cd Frontend
npm run build
# Deploy dist folder
```

---

## 📞 **Support**

- **Railway**: [railway.app](https://railway.app)
- **Vercel**: [vercel.com](https://vercel.com)
- **Netlify**: [netlify.com](https://netlify.com)
- **Heroku**: [heroku.com](https://heroku.com)

## 🎯 **Recommended for Beginners**

**Vercel + Railway** is the easiest option:
- ✅ Free tier available
- ✅ Automatic deployments
- ✅ Built-in PostgreSQL
- ✅ Great developer experience
- ✅ Excellent documentation 