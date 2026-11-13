# Blood Donation System

A beginner-friendly full-stack starter project for VS Code.

## Tech stack
- Frontend: React + Vite
- Backend: Java 17 + Spring Boot
- Database: MongoDB

## Requirements
1. Java JDK 17+
2. Maven 3.8+
3. Node.js 20+
4. MongoDB Community Server running locally

## Run the project

### 1. Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017`.

### 2. Start backend
Open a VS Code terminal:

```powershell
cd backend
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

### 3. Start frontend
Open a second VS Code terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Included features
- Register and login (demo authentication)
- Register a donor profile
- View and search donors by blood group and city
- Submit a blood request
- View submitted blood requests

## Important demo note
This is an educational starter, not a production medical system. Authentication is intentionally basic for local coursework. Before real deployment, add password hashing, JWT/session security, role-based authorization, input validation, rate limiting, HTTPS, audit logging, and privacy safeguards.
