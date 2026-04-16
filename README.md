# Role-Based Task API with Frontend

## Overview

This project is a scalable REST API with authentication and role-based access control, along with a minimal frontend for testing and interacting with the APIs.

The backend is built using Node.js, Express, and MongoDB. It supports user authentication using JWT and provides CRUD operations for managing tasks. The frontend is built using Next.js and allows users to register, log in, and manage tasks.

## Features

Backend:

* User registration and login with hashed passwords
* JWT-based authentication
* Role-based access control (user and admin)
* CRUD APIs for task management
* Input validation using Zod
* Protected routes using middleware
* API versioning (/api/v1)

Frontend:

* Signup and login pages
* Dashboard to create, update, delete, and view tasks
* Task status toggle (pending/completed)
* Reusable components for inputs, buttons, and task cards
* API integration using Axios

## Tech Stack

Backend:

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT for authentication
* bcrypt for password hashing
* Zod for validation

Frontend:

* Next.js (App Router)
* React
* Axios
* Tailwind CSS


## Project Structure

backend/

* src/

  * models/
  * routes/
  * validators/
  * middleware/
  * app.js
* server.js

frontend/

* app/

  * signup/
  * login/
  * dashboard/
* components/
* utils/


## Environment Variables

Create a `.env` file in the backend root using the following format:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

## Installation and Setup

1. Clone the repository

2. Install backend dependencies
   cd backend
   npm install

3. Install frontend dependencies
   cd frontend
   npm install

4. Run backend
   npm run dev

5. Run frontend
   npm run dev

Backend runs on http://localhost:5000
Frontend runs on http://localhost:3000

## API Endpoints

Auth:

* POST /api/v1/auth/register
* POST /api/v1/auth/login
* GET /api/v1/auth/me

Tasks:

* POST /api/v1/tasks
* GET /api/v1/tasks
* GET /api/v1/tasks/:id
* PUT /api/v1/tasks/:id
* DELETE /api/v1/tasks/:id

## Authentication

All task routes are protected and require a JWT token.

Send the token in headers:
Authorization: Bearer <your_token>

## Role-Based Access

* Users can create, update, and delete their own tasks
* Admins can access and manage all tasks

## Validation

Zod is used for validating request payloads for both authentication and task operations.


## Author

Bhumika Nagar
