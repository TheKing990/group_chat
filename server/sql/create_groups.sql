create database my_chat;
use my_chat;

CREATE Table groups(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  desc_text VARCHAR(100),
  created_at TIMESTAMP default NOW(),

);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  email VARCHAR(50),
  created_at TIMESTAMP default NOW()

);

CREATE TABLE comments (
  id  INTEGER AUTO_INCREMENT PRIMARY Key,
  comment_text VARCHAR(255) NOT NULL,
  user_id int NOT NULL,
  groups_id Int not null,
  created_at TIMESTAMP default NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(groups_id) REFERENCES groups(id)
);

CREATE TABLE favorite_groups (
  id  INTEGER AUTO_INCREMENT PRIMARY Key,
  user_id int NOT NULL,
  groups_id Int not null,
  created_at TIMESTAMP default NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(groups_id) REFERENCES groups(id)
);
