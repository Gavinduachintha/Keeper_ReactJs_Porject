# 📝 Keeper Notes - A Modern Note-Taking Application

<div align="center">

![Keeper Notes](https://img.shields.io/badge/Keeper-Notes-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?style=for-the-badge&logo=postgresql)

**A beautiful, secure, and feature-rich note-taking application built with modern web technologies.**

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🛠️ Tech Stack](#tech-stack) • [🚀 Deployment](#deployment)

</div>

---

## ✨ Features

### 🎨 **Beautiful User Interface**
- Modern, responsive design with smooth animations
- Colorful note cards with random color assignment
- Intuitive user experience with toast notifications
- Clean and minimalist interface

### 🔐 **Secure Authentication**
- User registration and login system
- Password hashing with bcrypt
- Session management with user-specific notes
- Remember me functionality

### 📝 **Note Management**
- Create, edit, and delete notes
- Rich text content support
- Automatic timestamp tracking
- Color-coded note organization
- Real-time updates

### 🚀 **Performance & Reliability**
- Fast loading with Vite build tool
- Optimized database queries
- Connection pooling for scalability
- Error handling and validation

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with modern features
- **React Toastify** - Beautiful notifications

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **ESLint** - Code linting
- **Git** - Version control
- **npm** - Package management

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/keeper-notes.git
   cd keeper-notes
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (root, backend, and frontend)
   npm run install:all
   ```

3. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb keeper_notes
   
   # Run database migrations (see DATABASE_SETUP.md)
   ```

4. **Configure environment variables**
   ```bash
   # Backend/.env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=keeper_notes
   DB_PASSWORD=your_password
   DB_PORT=5432
   NODE_ENV=development
   PORT=3000
   ```

5. **Start the application**
   ```bash
   # Run both frontend and backend
   npm run dev
   
   # Or run separately
   npm run dev:backend  # Backend on http://localhost:3000
   npm run dev:frontend # Frontend on http://localhost:5173
   ```

---

## 📁 Project Structure

```
keeper-notes/
├── Backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic (future)
│   │   ├── routes/         # API routes (future)
│   │   ├── models/         # Database models (future)
│   │   ├── middleware/     # Custom middleware (future)
│   │   ├── utils/          # Utility functions (future)
│   │   └── app.js          # Main server file
│   ├── package.json
│   └── .env               # Environment variables
├── Frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── notes/      # Note management components
│   │   │   ├── layout/     # Layout components
│   │   │   └── common/     # Shared components
│   │   ├── styles/         # CSS and assets
│   │   │   ├── global/     # Global styles
│   │   │   └── assets/     # Images and icons
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks (future)
│   │   ├── context/        # React context (future)
│   │   └── utils/          # Utility functions (future)
│   ├── public/             # Static assets
│   └── package.json
├── docs/                   # Documentation
├── deploy.sh              # Deployment script (Linux/Mac)
├── deploy.bat             # Deployment script (Windows)
└── package.json           # Root package.json
```

---

## 🔧 Available Scripts

### **Root Directory**
```bash
npm run install:all    # Install all dependencies
npm run dev           # Run both frontend and backend
npm run dev:backend   # Run only backend
npm run dev:frontend  # Run only frontend
npm run build         # Build frontend for production
npm start             # Start production backend
```

### **Backend Directory**
```bash
npm run dev           # Start development server
npm start             # Start production server
```

### **Frontend Directory**
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 🌐 API Endpoints

### **Authentication**
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### **Notes**
- `GET /api/notes?userId={id}` - Get user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

---

## 🚀 Deployment

### **Quick Deploy (Recommended)**
```bash
# Deploy to Railway + Vercel
./deploy.sh railway-vercel

# Deploy to Heroku
./deploy.sh heroku

# Windows users
deploy.bat railway-vercel
```

### **Manual Deployment**
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Supported Platforms:**
- 🚂 **Railway** - Backend hosting
- ⚡ **Vercel** - Frontend hosting
- 🌐 **Netlify** - Frontend hosting
- ⚡ **Heroku** - Full-stack hosting
- ☁️ **DigitalOcean/AWS** - VPS hosting

---

## 🎨 Screenshots

<div align="center">

### Welcome Screen
![Welcome Screen](screenshots/welcome.png)

### Login Page
![Login Page](screenshots/login.png)

### Notes Dashboard
![Notes Dashboard](screenshots/dashboard.png)

### Add/Edit Note
![Add Note](screenshots/add-note.png)

</div>

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side validation
- **CORS Protection** - Configured for production
- **SQL Injection Prevention** - Parameterized queries
- **Error Handling** - Secure error messages

---

## 🧪 Testing

```bash
# Run backend tests (future)
cd Backend
npm test

# Run frontend tests (future)
cd Frontend
npm test
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Style**
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add tests for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool
- **Express.js Team** - For the web framework
- **PostgreSQL Team** - For the database
- **ZeN Studio** - For the original design inspiration

---

## 📞 Support

- **Issues** - [GitHub Issues](https://github.com/your-username/keeper-notes/issues)
- **Discussions** - [GitHub Discussions](https://github.com/your-username/keeper-notes/discussions)
- **Email** - your-email@example.com

---

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/your-username/keeper-notes?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/keeper-notes?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/keeper-notes)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/keeper-notes)
![GitHub license](https://img.shields.io/github/license/your-username/keeper-notes)

---

<div align="center">

**Made with ❤️ by [Your Name]**

[⬆ Back to top](#-keeper-notes---a-modern-note-taking-application)

</div>
