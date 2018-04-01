create database my_chat;
use my_chat;

CREATE TABLE users (
  id INT identity PRIMARY KEY,
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

create table  message_c (
  id int  primary key auto_increment,
  user_one int not null,
  user_two int not null, 
  ip varchar(30) DEFAULT NULL,
  time TIMESTAMP default NOW(),
  FOREIGN KEY(user_one) REFERENCES users(id),
  FOREIGN KEY(user_two) REFERENCES users(id)
);


CREATE TABLE conversation_reply (
cr_id int(11) PRIMARY KEY auto_increment,
reply text,
user_id_fk int(11) NOT NULL,
ip varchar(30) default NULL,
time TIMESTAMP default NOW(),
c_id_fk int(11) NOT NULL,
FOREIGN KEY (user_id_fk) REFERENCES users(id),
FOREIGN KEY (c_id_fk) REFERENCES message_c(id)
);



CREATE Table groups(
  id INT identity PRIMARY KEY,
  group_name VARCHAR(50),
  created_at TIMESTAMP default NOW()

);

CREATE TABLE group_message (
  id  INTEGER identity PRIMARY Key,
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
