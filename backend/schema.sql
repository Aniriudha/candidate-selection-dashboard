CREATE DATABASE IF NOT EXISTS candidate_selection;
USE candidate_selection;

CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(120),
    experience INT,
    skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    crisis_score INT,
    sustainability_score INT,
    motivation_score INT,
    ai_feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
        ON DELETE CASCADE
);

CREATE TABLE rankings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    total_score FLOAT,
    rank_position INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
        ON DELETE CASCADE
);
