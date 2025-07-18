#  Leaderboard App — Full Stack Task

A real-time leaderboard application where users can claim points and get ranked. Top 3 are styled with 3D cards, and remaining are listed. Built with React, Node.js, Express, and MongoDB Atlas.

---

##  Live App
> [Frontend Live (Vercel)](https://your-leaderboard.vercel.app)  

##  Tech Stack

- Frontend: React, Plain CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas (Cloud)
-Icons: react-icons
-Deployment: Vercel (frontend)


##  Features

-  Add users via top-left profile icon (modal popup)
-  Claim random points (1–10) via coin icon (modal popup)
-  Leaderboard auto-ranks users by total points
-  Top 3 users displayed in elevated 3D layout
-  Ranks 4–10 displayed in styled list layout
-  MongoDB collection logs claim history
-  Auto-refresh every 2 seconds (simulated real-time updates)
-  Responsive across all screen sizes (desktop-first focus)

##  Folder Structure

leaderboard-task/
├── backend/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── README.md
├── .env
├── README.md
└── requirements.txt

## Local Setup Instructions

### 1. Clone Repo

bash
git clone https://github.com/akashverma92/leaderboard-task.git
cd leaderboard-task


###  2. Start Backend

bash
cd backend
npm install
node server.js


>  Make sure you have a `.env` file:
MONGODB_URI=your-mongodb-uri
PORT=5000

### 🔹 3. Start Frontend

bash
cd ../frontend
npm install
npm start


## MongoDB Setup

- Use MongoDB Atlas Free Cluster
- Store connection string in `.env`
- Automatically creates:
  - `users` collection
  - `claimHistory` collection (every point claim is logged)



## Author

Akash Verma  
_B.Tech Final Year  
GitHub: [@yourusername](https://github.com/akashverma92)