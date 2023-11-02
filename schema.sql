CREATE DATABASE chatterbox;

USE chatterbox;

CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  text TEXT NOT NULL,
  roomname VARCHAR(20) NOT NULL
);