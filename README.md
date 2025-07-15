A full-stack real-time leaderboard web application built with **Node.js**, **Express**, **MongoDB**, **ReactJS (Vite)**, and **Socket.IO**. Users can claim points, which are updated live on the leaderboard with ranking changes.

---

##  Features

-  Claim random points for any user (1–10 points per click)
-  Add new users dynamically
-  Live leaderboard updates with **Socket.IO**
-  Backend stores and updates rankings based on total points
-  Claim history collection to track all actions
-  Clean UI with pagination (top 3 fixed, bottom 7 paginated)
-  Optimized with `.gitignore`, modular structure, and best practices

---

##  Tech Stack

| Layer     | Tech                            |
|-----------|---------------------------------|
| Frontend  | ReactJS (Vite), Axios, Socket.IO-client |
| Backend   | Node.js, Express, MongoDB, Socket.IO |
| Database  | MongoDB (with Mongoose)         |
| Cloud     | Cloudinary for user avatars     |
| Tools     | Multer (uploads), dotenv, nodemon |

---

##  Project Structure

```

project-root/
│
├── backend/
│   ├── src/
│   │   ├── models/           # Mongoose schemas (User, History)
│   │   ├── controllers/      # Business logic (claim, fetch, add)
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # File uploads
│   │   ├── config/           # DB and Cloudinary config
│   │   ├── utils/            # Reusable utilities
│   │   └── index.js          # Entry point
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/       # AddUser, ClaimPoints, Leaderboard
│   │   ├── styles/           # CSS files
│   │   ├── utils/            # Socket and helpers
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md

````

---

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/Yoriichi17/Real_Time_leaderboard
cd Real_Time_leaderboard
````

### 2. Setup Backend

```bash
cd backend
npm install
```

####  Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_db_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DEFAULT_PFP=default_image_url
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

---

##  Running the App

### Start Backend (in one terminal):

```bash
cd backend
npm run dev
```

### Start Frontend (in another terminal):

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

##  API Overview

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| GET    | `/api/user/fetchUsers`       | Fetch users with pagination  |
| POST   | `/api/user/addUser`          | Add a new user               |
| POST   | `/api/coins/claim`           | Claim random points for user |
| GET    | `/api/coins/history/:userId` | Get claim history of a user  |

---

## 📸 Screenshots
<img width="1916" height="906" alt="Screenshot 2025-07-15 220743" src="https://github.com/user-attachments/assets/402c7c9f-04f0-48ac-84e5-3f128a929de8" />
<img width="1917" height="907" alt="Screenshot 2025-07-15 220820" src="https://github.com/user-attachments/assets/f5ca33ba-1f63-4f00-885c-9d469adeaf6b" />
<img width="1916" height="911" alt="Screenshot 2025-07-15 220908" src="https://github.com/user-attachments/assets/6436979a-5c71-4ad9-b75d-227f3e4b9667" />

---
```
