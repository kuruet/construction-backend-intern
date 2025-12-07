-- Drop existing tables if they exist (optional)
DROP TABLE IF EXISTS daily_reports;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

-- =============================
-- USERS TABLE
-- =============================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'worker') NOT NULL DEFAULT 'worker',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- PROJECTS TABLE
-- =============================
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('planned', 'active', 'completed') DEFAULT 'planned',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_user FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Index for filtering projects by status
CREATE INDEX idx_projects_status ON projects(status);

-- =============================
-- DAILY REPORTS TABLE
-- =============================
CREATE TABLE daily_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    work_description TEXT NOT NULL,
    weather VARCHAR(50),
    worker_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_dpr_project FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_dpr_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_dpr_project ON daily_reports(project_id);
CREATE INDEX idx_dpr_date ON daily_reports(date);
