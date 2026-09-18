CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    muscle_group VARCHAR(50) NOT NULL
);

CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    comments TEXT,
    scheduled_at DATETIME,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE workout_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    exercise_id INT NOT NULL,
    repetitions INT NOT NULL,
    sets INT NOT NULL,
    weight DECIMAL(8,2) DEFAULT 0,

    FOREIGN KEY (workout_id) REFERENCES workouts(id)
        ON DELETE CASCADE,

    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
        ON DELETE CASCADE
);

CREATE TABLE progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    workout_id INT,
    notes TEXT,
    progress_value DECIMAL(8,2),
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (workout_id) REFERENCES workouts(id)
        ON DELETE SET NULL
);

INSERT INTO exercises
(name, description, category, muscle_group)
VALUES
('Press de banca',
 'Ejercicio para trabajar principalmente el pecho.',
 'fuerza',
 'pecho'),

('Sentadilla',
 'Ejercicio compuesto para trabajar las piernas.',
 'fuerza',
 'piernas'),

('Dominadas',
 'Ejercicio para desarrollar la espalda.',
 'fuerza',
 'espalda'),

('Correr',
 'Actividad cardiovascular de resistencia.',
 'cardio',
 'piernas'),

('Estiramiento de piernas',
 'Ejercicio para mejorar la flexibilidad.',
 'flexibilidad',
 'piernas');