DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    age int NOT NULL,
    subject varchar(255),
    learningDiff int
);
