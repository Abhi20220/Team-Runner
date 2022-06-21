DROP DATABASE IF EXISTS running_db;
CREATE DATABASE running_db;

USE running_db;

CREATE TABLE run_statistics (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    times_ran INT NOT NULL,
    run_distance INT

);

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    runner_name VARCHAR (30),
    is_active BOOLEAN,
    age INT,
    FOREIGN KEY(runner_name)
    REFERENCES run_statistics (id)
    ON DELETE SET NULL

);


delete