🏗️ Construction Management Backend API

A production-ready REST API backend for managing construction projects, users, and daily progress reports (DPRs).
This service demonstrates clean backend architecture, secure authentication, relational database design, and role-based access control.

The API powers core workflows such as:

User authentication and authorization

Project lifecycle management 

Daily construction progress reporting

Role-based access to protected resources

This project was developed as part of a Backend Developer Internship Selection Task.

📚 Table of Contents

Project Overview

System Architecture

Tech Stack

Database Design

Installation & Setup

Environment Variables

Running the Server

API Authentication Flow

Role Based Access Control

API Endpoints

Example API Requests

Validation & Error Handling

Folder Structure

Postman Collection

SQL Schema

Design Decisions

Future Improvements

🏗️ Project Overview

The Construction Management Backend API provides the server-side infrastructure for managing construction operations.

Key capabilities include:

👤 User Management

Register users

Authenticate users with JWT

Role-based authorization

🏗️ Project Management

Create projects

Update project status

List and filter projects

Delete projects (admin only)

📊 Daily Progress Reports (DPR)

Workers and managers submit daily work updates

DPRs are linked to both projects and users

Reports can be queried by project or globally

🔐 Secure Access Control

The system supports three roles:

Admin

Manager

Worker

Access permissions are enforced using middleware-based role validation.

🏛️ System Architecture

The backend follows a layered architecture to ensure maintainability and scalability.

Client (Postman / Frontend)
        │
        ▼
      Routes
        │
        ▼
    Controllers
        │
        ▼
      Models
        │
        ▼
   Sequelize ORM
        │
        ▼
     MySQL Database
     
Layer Responsibilities

Routes

Define API endpoints

Forward requests to controllers

Controllers

Implement application logic

Handle request/response lifecycle

Models

Define database schema and relationships

Middleware

Authentication

Role authorization

Input validation

Error handling


🛠️ Tech Stack

| Component        | Technology            |
| ---------------- | --------------------- |
| Runtime          | Node.js               |
| Framework        | Express.js            |
| Database         | MySQL                 |
| ORM              | Sequelize             |
| Authentication   | JSON Web Tokens (JWT) |
| Password Hashing | bcrypt                |
| Validation       | express-validator     |
| API Testing      | Postman               |
| Version Control  | Git + GitHub          |



🗄️ Database Design

The system uses a relational MySQL database with foreign key relationships.

Entities

Users

Projects

Daily Reports

Database Relationships

Users (1) ────── (Many) Projects
Users (1) ────── (Many) Daily Reports
Projects (1) ─── (Many) Daily Reports

Relationship Explanation

A user can create multiple projects

A project can have many DPR entries

A DPR is created by a specific user

📊 Database Schema


Users Table

| Column        | Type                         | Key    | Default           | Description        |
| ------------- | ---------------------------- | ------ | ----------------- | ------------------ |
| id            | INT                          | PK     | AUTO_INCREMENT    | Unique user ID     |
| name          | VARCHAR(255)                 |        |                   | Full name          |
| email         | VARCHAR(255)                 | UNIQUE |                   | User email         |
| password_hash | VARCHAR(255)                 |        |                   | Hashed password    |
| role          | ENUM(admin, manager, worker) |        | worker            | User role          |
| created_at    | DATETIME                     |        | CURRENT_TIMESTAMP | Creation timestamp |



Projects Table

| Column      | Type                             | Key           | Default           | Description         |
| ----------- | -------------------------------- | ------------- | ----------------- | ------------------- |
| id          | INT                              | PK            | AUTO_INCREMENT    | Project ID          |
| name        | VARCHAR(255)                     |               |                   | Project name        |
| description | TEXT                             |               | NULL              | Project description |
| start_date  | DATETIME                         |               | NULL              | Start date          |
| end_date    | DATETIME                         |               | NULL              | End date            |
| status      | ENUM(planned, active, completed) |               | planned           | Project status      |
| created_by  | INT                              | FK → users.id |                   | Project creator     |
| created_at  | DATETIME                         |               | CURRENT_TIMESTAMP | Creation time       |


Daily Reports Table

| Column           | Type        | Key              | Default           | Description        |
| ---------------- | ----------- | ---------------- | ----------------- | ------------------ |
| id               | INT         | PK               | AUTO_INCREMENT    | Report ID          |
| project_id       | INT         | FK → projects.id |                   | Associated project |
| user_id          | INT         | FK → users.id    |                   | Report creator     |
| date             | DATE        |                  |                   | Report date        |
| work_description | TEXT        |                  |                   | Work completed     |
| weather          | VARCHAR(50) |                  | NULL              | Weather conditions |
| worker_count     | INT         |                  | 0                 | Number of workers  |
| created_at       | TIMESTAMP   |                  | CURRENT_TIMESTAMP | Record creation    |



💻 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/kuruet/construction-backend-intern.git
cd construction-backend-intern

2️⃣ Install Dependencies
npm install

3️⃣ Setup MySQL Database

Create database:

CREATE DATABASE construction_app;
4️⃣ Configure Environment Variables

Create .env file:

PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=construction_app
DB_DIALECT=mysql

JWT_SECRET=changeme
JWT_EXPIRES_IN=7d
5️⃣ Run Database Schema

Run the SQL script:

sql/schema.sql

Or allow Sequelize to create tables automatically.

▶️ Running the Server

Start development server:

npm run dev

Server will start at:

http://localhost:4000
🔐 Authentication Flow

The API uses JWT based authentication.

Login Process

1️⃣ User logs in with email and password

2️⃣ Password is verified using bcrypt

3️⃣ Server generates a JWT token

4️⃣ Client stores token

5️⃣ Token must be sent in every protected request

Example request header:

Authorization: Bearer <JWT_TOKEN>

JWT ensures stateless authentication and secure API access.

🛡️ Role Based Access Control

The system supports three roles:

admin
manager
worker

Role validation is implemented using authorization middleware.

🚀 API Endpoints

Authentication

| Method | Endpoint            | Access | Description           |
| ------ | ------------------- | ------ | --------------------- |
| POST   | /api/users/register | Public | Register user         |
| POST   | /api/users/login    | Public | Login and receive JWT |


Projects

| Method | Endpoint          | Access        | Description         |
| ------ | ----------------- | ------------- | ------------------- |
| POST   | /api/projects     | Admin/Manager | Create project      |
| GET    | /api/projects     | Authenticated | List projects       |
| GET    | /api/projects/:id | Authenticated | Get project details |
| PUT    | /api/projects/:id | Admin/Manager | Update project      |
| DELETE | /api/projects/:id | Admin         | Delete project      |



Daily Progress Reports

| Method | Endpoint               | Access        | Description       |
| ------ | ---------------------- | ------------- | ----------------- |
| POST   | /api/projects/:id/dpr  | Authenticated | Create DPR        |
| GET    | /api/projects/:id/dpr  | Authenticated | List project DPRs |
| GET    | /api/daily-reports     | Authenticated | List all DPRs     |
| PUT    | /api/daily-reports/:id | Manager/Admin | Update DPR        |
| DELETE | /api/daily-reports/:id | Admin         | Delete DPR        |


📬 Example API Requests
Register User
POST /api/users/register

Request body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:

{
  "message": "User registered successfully",
  "userId": 1
}
Login
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:

{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "John Doe",
    "role": "manager"
  }
}
✅ Validation & Error Handling

The API includes comprehensive validation and error handling.

Validation

Implemented using express-validator

Ensures required fields and correct data types

Example validations:

Email format

Password length

Date formats

Worker count as integer

HTTP Status Codes
Code	Meaning
200	Success
201	Resource Created
400	Bad Request
401	Unauthorized
403	Forbidden
404	Not Found
500	Server Error

📁 Folder Structure

src
 ├── config
 │    database.js
 │
 ├── controllers
 │    auth.controller.js
 │    project.controller.js
 │    dpr.controller.js
 │
 ├── models
 │    user.model.js
 │    project.model.js
 │    dailyReport.model.js
 │
 ├── routes
 │    auth.routes.js
 │    project.routes.js
 │
 ├── middlewares
 │    auth.middleware.js
 │    role.middleware.js
 │    error.middleware.js
 │
 ├── validators
 │
 └── server.js
 

This structure follows separation of concerns and scalable backend architecture.

📬 Postman Collection

A Postman collection is included:

postman/construction-app.postman_collection.json

Import into Postman to test all endpoints.

Protected routes require:

Authorization: Bearer <JWT>
🗄️ SQL Schema

The repository includes a full SQL schema file:

sql/schema.sql

It contains table creation scripts and foreign key relationships.

⚙️ Design Decisions

Key engineering decisions made in this project:

1️⃣ Sequelize ORM used to simplify database interaction and maintain model relationships.

2️⃣ JWT authentication implemented for stateless secure authentication.

3️⃣ bcrypt password hashing used to securely store user credentials.

4️⃣ Layered architecture separates routes, controllers, models, and middleware for maintainability.

5️⃣ express-validator ensures input validation at the request layer.

6️⃣ Role based middleware protects sensitive routes.



## 🎥 Video Walkthrough

A detailed walkthrough of the backend implementation, including:

- Database schema and relationships
- Authentication flow (JWT)
- Role-based access control
- API endpoints demonstration using Postman
- How to run and test the project locally

**Video Link:**  
https://drive.google.com/file/d/1krkDea5pBhMfFvVF0YeYskr_XYXRhagf/view



🚀 Future Improvements

Potential improvements for production deployment:

Project member assignment

File attachments for DPR reports

API rate limiting

Request logging

Unit tests using Jest

Docker containerization

CI/CD pipeline integration

Pagination and advanced filtering




Backend Developer Internship Submission

Built with a focus on clean architecture, security, and maintainability.
