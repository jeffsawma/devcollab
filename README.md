# DevCollab

DevCollab is a full-stack collaborative workspace management application built with Angular, Node.js, Express, MongoDB Atlas, JWT authentication, and Socket.io.

The application allows users to:

- Register and log in securely
- Create and manage workspaces
- Create and manage milestones
- Receive real-time WebSocket notifications

---

# Live Application

## Frontend

https://devcollab-frontend-346u.onrender.com

## Backend API

https://devcollab-e6ac.onrender.com

## GitHub Repository

https://github.com/jeffsawma/devcollab

---

# Important

> **Note:** Render free-tier services may take 30–60 seconds to wake up after inactivity.

---

# Features

- User authentication with JWT
- Password hashing using Bcrypt
- Protected backend routes
- RESTful API architecture
- Workspace CRUD operations
- Milestone CRUD operations
- Real-time WebSocket events using Socket.io
- Angular standalone frontend
- MongoDB Atlas integration
- Deployment on Render

---

# Technologies Used

## Frontend

- Angular
- TypeScript
- Socket.io Client
- HTML
- CSS

## Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Socket.io

---

# WebSocket Events

The application implements real-time communication using Socket.io.

Implemented events:

- `workspace:created`
- `workspace:deleted`
- `milestone:created`
- `milestone:deleted`

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/jeffsawma/devcollab.git
cd devcollab
```

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

Backend local URL:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend local URL:

```bash
http://localhost:4200
```

---

# Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=5000
```

---

# Deployment

## Backend Deployment

- Render Web Service

## Frontend Deployment

- Render Static Site

---

# Project Structure

```bash
devcollab/
│
├── backend/
│   ├── src/
│   └── ...
│
├── frontend/
│   ├── src/
│   └── ...
│
└── README.md
```

---

# Author

Jeff Sawma
