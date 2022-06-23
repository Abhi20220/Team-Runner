-- DROP DATABASE IF EXISTS running_db;
-- CREATE DATABASE running_db;

-- USE running_db;


-- CREATE TABLE user (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR (30) NOT NULL,
--     last_name VARCHAR (30) NOT NULL,
--     email VARCHAR (30) NOT NULL,
--     user_password VARCHAR (30) NOT NULL,
--     is_active BOOLEAN,
--     age INT,
  

-- );

-- CREATE TABLE run_statistics (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     times_ran INT NOT NULL,
--     run_distance INT,
--     user_id INT,
--     FOREIGN KEY(user_id)
--     REFERENCES user (id)
--     ON DELETE SET NULL

-- );


