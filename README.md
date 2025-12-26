# 🚀 AI Career OS

AI Career OS is a full-stack AI-powered career guidance platform that provides personalized career analysis, skill-gap insights, and structured learning roadmaps based on a user’s profile.

The project is built as a production-ready MVP, showcasing real-world engineering decisions such as AI fallback handling, unified deployment, and integration of Google technologies.

## 🔗 Live Demo: https://career-ai-webj.onrender.com

---

# ✨ Features

- 🧠 AI-Powered Career Analysis

   Generates structured career insights using AI.

- 📊 Personalized Career Recommendations
  
  Role suggestions with reasoning, fit score, and market context.

- 🧩 Skill Gap Analysis

  Identifies strengths, improvement areas, and missing skills.

- 🗺️ Career Roadmap

  Phase-wise learning plan with timelines and outcomes.

- 🔐 Firebase Authentication (Google Tech)

  Secure user authentication using Google Firebase.

- 🗄️ Firebase Database / Firestore (Google Tech)

  Integrated to store user data and analysis results.

- 🎨 Modern UI & UX

  Smooth animations, clean layout, and intuitive loading states.

- 🌐 Unified Production Deployment

  Frontend and backend deployed together as a single service.

---

# 🏗️ Tech Stack

## Frontend

- React + Vite

- TypeScript

- Tailwind CSS

- Framer Motion

- Lucide Icons

## Backend

- Node.js

- Express

- Zod (runtime validation)

- In-memory storage (used as MVP fallback)

## AI & Google Technologies

- Google Gemini API
Used for AI-powered career analysis.

  ⚠️ Due to free-tier usage limits, the system includes a graceful fallback/demo mode to ensure uninterrupted functionality.

- Firebase Authentication
Google-based authentication for users.

- Firebase Firestore
Used as the primary database layer.

## Deployment

- Render (Unified Node deployment)

- GitHub (Version control)

---

# 🧠 How It Works

1. User signs in using Firebase Authentication

2. User submits a career profile

3. Backend validates input using Zod schemas

4. AI analysis is generated using Gemini API

  - If API limits are reached, a fallback analysis is used

5. Results are stored (Firebase / in-memory for MVP)

6. User is redirected to a detailed results page

This design ensures:

- Reliability under API constraints

- Smooth user experience

- Clear separation between AI logic and UI

---

# 📁 Project Structure
CareerAI/
│
├── client/              # Frontend (React + Vite)
│   ├── src/
│   └── index.html
│
├── server/              # Backend (Express)
│   ├── index.js
│   ├── routes.js
│   ├── storage.js
│   └── static.js
│
├── shared/              # Shared runtime-safe contracts
│   └── routes.js
│
├── package.json
├── vite.config.ts
├── LICENSE
└── README.md


# 🚀 Getting Started (Local Development)
## 1️⃣ Clone the repository
git clone https://github.com/Shubh2026/CareerAI.git

cd CareerAI

## 2️⃣ Install dependencies
npm install

## 3️⃣ Run in development mode
npm run dev

# 🏭 Production Build & Run (Local)
npm run build

npm start


## Then open:

http://localhost:8080

# 🌍 Deployment

The application is deployed on Render as a single unified Node service:

- Express handles API routes

- Vite builds the frontend

- Backend serves static frontend files in production

- No serverless fragmentation or proxy complexity

# Render Configuration

- Build Command: npm install && npm run build

- Start Command: npm start

- Environment: Node

- Instance Type: Free

# ⚠️ Free Tier Considerations

- Render free tier services sleep after inactivity

- First request may take ~20–30 seconds

- Gemini API free tier has request limits

- Fallback logic ensures uninterrupted demo experience

These constraints are intentionally handled in the system design.

# 🔮 Future Improvements

- Persistent database-first storage

- Saved career reports & history

- Export reports as PDF

- Advanced AI prompt tuning

- User dashboard & analytics

- Role-based access control

# 📌 Why This Project Stands Out

AI Career OS demonstrates:

- Real-world AI integration with fallback handling

- Practical use of Google technologies (Gemini + Firebase)

- Production-grade Node.js deployment

- Clean frontend–backend separation

- UX patterns used in modern SaaS applications

This project reflects real engineering decisions, not just ideal scenarios.

# 📄 License

This project is licensed under the MIT License.
