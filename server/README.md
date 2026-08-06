# Farminix Premium Grocery Backend Server

This directory contains a robust, production-grade Express.js & TypeScript API server designed to power the Farminix e-commerce frontend application.

## 🚀 Features
- **User Authentication**: JWT logins, refresh token rotation, mobile OTP verification routes.
- **User Profile**: Multiple address books (Home, Work, Other) and default selection queries.
- **Order Management**: Cart calculations, coupon application (code `FARM10`), automated delivery charge calculations, and order creation.
- **PostgreSQL Database Schema**: A pre-designed PostgreSQL relational schema matching the full structure of the app.
- **AI Support Assistant**: Simulated chatbot API responding to shopping questions.

---

## 🛠️ Getting Started

### 1. Prerequisite Checklist
- [Node.js](https://nodejs.org) (v18+ recommended)
- [PostgreSQL Database](https://www.postgresql.org) (v15+ recommended)

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize PostgreSQL Tables
Import the schema into your local or remote PostgreSQL database:
```bash
psql -U your_postgres_user -d farminix_db -f schema.sql
```

### 4. Configure Environment Variables
Create a `.env` file in this directory:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/farminix_db
JWT_SECRET=your_super_secret_jwt_string
REFRESH_SECRET=your_refresh_token_secret_string
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
npm start
```
