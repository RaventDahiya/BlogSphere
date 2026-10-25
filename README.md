# BlogSphere

BlogSphere is a Node.js blogging platform built with Express, MongoDB, Mongoose, EJS, and Bootstrap. It currently includes user registration and sign-in flows with salted password hashing and responsive authentication pages.

## Features

- User signup with duplicate-email detection
- Password hashing with a per-user salt
- User sign-in with password verification
- EJS server-rendered pages
- Bootstrap-based responsive UI
- Neon-themed signup and sign-in cards
- Development workflow with Nodemon

## Tech stack

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Bootstrap

## Prerequisites

- Node.js 18 or newer
- A running MongoDB instance or MongoDB Atlas database

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/blogsphere
PORT=3000
```

Do not commit `.env`. It is excluded by `.gitignore`.

### 3. Start the application

For development with automatic restarts:

```bash
npm run dev
```

For a normal start:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Home page |
| `GET` | `/user/signup` | Signup page |
| `POST` | `/user/signup` | Create a user account |
| `GET` | `/user/signin` | Sign-in page |
| `POST` | `/user/signin` | Verify user credentials |

## Project structure

```text
BlogSphere/
├── controllers/       # Request handlers
├── models/            # Mongoose schemas and models
├── routes/            # Express routes
├── views/             # EJS pages and partials
├── public/            # Static assets
├── index.js           # Application entry point
├── package.json       # Scripts and dependencies
└── .env               # Local configuration (not committed)
```

## Available scripts

```bash
npm start
npm run dev
npm test
```

The test script is currently a placeholder and does not run automated tests yet.

## Notes

- Passwords are hashed before users are saved.
- Email addresses are normalized to lowercase during signup and sign-in.
- Signup uses a redirect-after-submit flow so refreshing the page does not resubmit the form.
- MongoDB must be available before the application can start listening.
