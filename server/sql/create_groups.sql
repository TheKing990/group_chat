create database my_chat;
use my_chat;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  email VARCHAR(50),
  created_at TIMESTAMP default NOW()

);
CREATE TABLE friends(
  user_id int not null,
  friend_id int not null,
  created_at TIMESTAMP default NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(friend_id) REFERENCES users(id)
);

CREATE Table groups(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  created_at TIMESTAMP default NOW()

);

CREATE TABLE group_message (
  id  INTEGER AUTO_INCREMENT PRIMARY Key,
  message_text VARCHAR(255) NOT NULL,
  user_id int NOT NULL,
  groups_id Int not null,
  created_at TIMESTAMP default NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(groups_id) REFERENCES groups(id)
);

CREATE TABLE group_members (
  user_id int NOT NULL,
  group_id Int not null,
  created_at TIMESTAMP default NOW(),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(groups_id) REFERENCES groups(id)
);
