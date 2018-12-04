DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo;

USE todo;

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT,
  task TEXT,
  urgent INT,
  complete INT,
  PRIMARY KEY (id)
);
