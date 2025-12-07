🏗️ Construction Management App — Backend

A REST API backend for managing construction projects, daily progress reports (DPRs), and users with role-based access control.

📚 Table of Contents

Project Overview

Tech Stack

Database

Installation & Setup

Environment Variables

Database Schema

API Endpoints

Validation & Error Handling

Running the Server

Postman Collection

Folder Structure

🏗️ Project Overview

This backend REST API supports the core features of the Construction Management App:

👤 User registration & authentication

🔑 Role-based access control (Admin, Manager, Worker)

📝 Project management (create, read, update, delete)

📊 Daily Progress Reports (DPRs) linked to projects

✅ Input validation & proper error handling

🗄️ Database relationships via MySQL and Sequelize ORM

Goal: Build a fully functional backend that can be tested via Postman or any REST client.

🛠️ Tech Stack

Language: Node.js (ES6, Express framework)

Database: MySQL

ORM: Sequelize

Authentication: JWT (JSON Web Tokens)

Validation: express-validator

Version Control: Git & GitHub

💾 Database

Database used: MySQL

⚙️ Setup

Install MySQL on your system

Create a database: construction_app

Configure .env file with your database credentials

Run the SQL schema provided or use sequelize.sync() to automatically create tables

Tables:

users — stores user accounts and roles

projects — stores project information

daily_reports — stores DPRs linked to projects

💻 Installation & Setup
Clone Repository
git clone https://github.com/yourusername/construction-management-backend.git
cd construction-management-backend

Install Dependencies
npm install

Configure Environment Variables

Create a .env file (or use .env.example as reference):

PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=construction_app
JWT_SECRET=changeme
JWT_EXPIRES_IN=7d
DB_DIALECT=mysql

Start the Server
npm run dev

🗂️ Database Schema
Users Table
Field	Type	Key	Notes
id	INT (PK, auto-increment)	PK	
name	VARCHAR(255)		
email	VARCHAR(255)	UNI	Unique email
password_hash	VARCHAR(255)		Hashed password
role	ENUM('admin','manager','worker')		Default: worker
created_at	DATETIME		
Projects Table
Field	Type	Key	Notes
id	INT (PK, auto-increment)	PK	
name	VARCHAR(255)		
description	TEXT		
start_date	DATETIME		
end_date	DATETIME		
status	ENUM('planned','active','completed')		Default: planned
created_by	INT (FK → users.id)	FK	Creator user
created_at	DATETIME		
Daily Reports Table
Field	Type	Key	Notes
id	INT (PK)	PK	
project_id	INT	FK	References projects.id
user_id	INT	FK	References users.id
date	DATE		
work_description	TEXT		Description of work done
weather	VARCHAR(50)		Optional
worker_count	INT		Optional
created_at	TIMESTAMP		Default: CURRENT_TIMESTAMP
🚀 API Endpoints
Authentication
Method	URL	Access	Description
POST	/api/users/register	Public	Register a new user
POST	/api/users/login	Public	Login and receive JWT token
Projects
Method	URL	Access	Description
POST	/api/projects	Admin/Manager	Create a new project
GET	/api/projects	All logged in	List all projects
GET	/api/projects/:id	All logged in	Get project by ID
PUT	/api/projects/:id	Admin/Manager	Update project
DELETE	/api/projects/:id	Admin only	Delete project
Daily Progress Reports (DPR)
Method	URL	Access	Description
POST	/api/projects/:id/dpr	Worker/Manager/Admin	Create DPR for a project
GET	/api/projects/:id/dpr	Worker/Manager/Admin	List all DPRs for a project
GET	/api/daily-reports	Worker/Manager/Admin	List all DPRs globally
PUT	/api/daily-reports/:id	Manager/Admin	Update DPR
DELETE	/api/daily-reports/:id	Admin only	Delete DPR
✅ Validation & Error Handling

All inputs validated using express-validator

Proper HTTP status codes returned: 200, 201, 400, 401, 403, 404, 500

Descriptive error messages for easy debugging

📂 Folder Structure
src/
├─ controllers/        # API controller functions
├─ middlewares/        # Auth, RBAC, validation handler
├─ models/             # Sequelize models
├─ routes/             # Express routes
├─ validators/         # Input validation rules
├─ config/             # DB and other configuration
├─ .env                # Environment variables (not committed)
├─ .env.example        # Example environment variables
├─ server.js           # Main entry point

🧪 Running the Server
npm install
npm run dev


Server URL: http://localhost:4000

Test APIs via Postman using /api/... endpoints

Use Bearer Token (JWT) for protected routes

📬 Postman Collection

Import construction-app.postman_collection.json

All endpoints are tested and ready to use
A REST API backend for managing construction projects, daily progress reports (DPRs), and users with role-based access control.

Table of Contents

Project Overview

Tech Stack

Database

Installation & Setup

Environment Variables

Database Schema

API Endpoints

Validation & Error Handling

Running the Server

Postman Collection

Folder Structure

Project Overview

This backend REST API supports core features of the Construction Management App:

User registration and authentication

Role-based access (Admin, Manager, Worker)

Project management (create, read, update, delete)

Daily Progress Reports (DPRs) for projects

Input validation and proper error handling

Database relationships via MySQL and Sequelize ORM

Goal: Build a fully functional backend that can be tested via Postman or any REST client.

Tech Stack

Language: Node.js (ES6 syntax, Express framework)

Database: MySQL

ORM: Sequelize

Authentication: JWT (JSON Web Tokens)

Validation: express-validator

Version Control: Git & GitHub

Database

MySQL is used as the database.

Setup

Install MySQL on your system.

Create a database: construction_app.

Configure .env file with your database credentials.

Run the SQL schema provided or use sequelize.sync() to create tables automatically.

Tables:

users — stores user accounts and roles

projects — stores project information

daily_reports — stores daily progress reports linked to projects

Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/construction-management-backend.git
cd construction-management-backend


Install dependencies:

npm install


Configure environment variables (see .env.example):

PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=construction_app
JWT_SECRET=changeme
JWT_EXPIRES_IN=7d
DB_DIALECT=mysql


Start the server:

npm run dev

Database Schema
Users Table
Field	Type	Key	Notes
id	INT (PK, auto-increment)	PK	
name	VARCHAR(255)		
email	VARCHAR(255)	UNI	Unique email
password_hash	VARCHAR(255)		Hashed password
role	ENUM('admin','manager','worker')		Default: worker
created_at	DATETIME		
Projects Table
Field	Type	Key	Notes
id	INT (PK, auto-increment)	PK	
name	VARCHAR(255)		
description	TEXT		
start_date	DATETIME		
end_date	DATETIME		
status	ENUM('planned','active','completed')		Default: planned
created_by	INT (FK → users.id)	FK	Creator user
created_at	DATETIME		
Daily Reports Table
Field	Type	Key	Notes
id	INT (PK)	PK	
project_id	INT	FK	References projects.id
user_id	INT	FK	References users.id
date	DATE		
work_description	TEXT		Description of work done
weather	VARCHAR(50)		Optional
worker_count	INT		Optional
created_at	TIMESTAMP		Default: CURRENT_TIMESTAMP
API Endpoints
Authentication
Method	URL	Access	Description
POST	/api/users/register	Public	Register a new user
POST	/api/users/login	Public	Login and receive JWT token
Projects
Method	URL	Access	Description
POST	/api/projects	Admin/Manager	Create a new project
GET	/api/projects	All logged in	List all projects
GET	/api/projects/:id	All logged in	Get project by ID
PUT	/api/projects/:id	Admin/Manager	Update project
DELETE	/api/projects/:id	Admin only	Delete project
Daily Progress Reports (DPR)
Method	URL	Access	Description
POST	/api/projects/:id/dpr	Worker/Manager/Admin	Create DPR for a project
GET	/api/projects/:id/dpr	Worker/Manager/Admin	List all DPRs for a project
GET	/api/daily-reports	Worker/Manager/Admin	List all DPRs globally
PUT	/api/daily-reports/:id	Manager/Admin	Update DPR
DELETE	/api/daily-reports/:id	Admin only	Delete DPR
Validation & Error Handling

All input fields are validated using express-validator.

Correct HTTP status codes are returned (200, 201, 400, 401, 403, 404, 500).

Errors return descriptive messages for easy debugging.

Postman Collection

All endpoints are tested via Postman.

Import the collection: construction-app.postman_collection.json

Use Bearer Token (JWT) for protected routes.

Folder Structure
src/
├─ controllers/        # API controller functions
├─ middlewares/        # Auth, RBAC, validation handler
├─ models/             # Sequelize models
├─ routes/             # Express routes
├─ validators/         # Input validation rules
├─ config/             # DB and other configuration
├─ .env                # Environment variables (not committed)
├─ .env.example        # Example environment variables
├─ server.js           # Main entry point

Running the Server
npm install
npm run dev


Server runs at: http://localhost:4000

Test APIs via Postman using /api/... endpoints
