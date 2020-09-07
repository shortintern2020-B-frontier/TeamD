# Written by Taishi Hosokawa

CREATE TABLE stamp (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT stamp (id, name) VALUES (NULL, "applause");
INSERT stamp (id, name) VALUES (NULL, "angry");
INSERT stamp (id, name) VALUES (NULL, "love");
INSERT stamp (id, name) VALUES (NULL, "music");
INSERT stamp (id, name) VALUES (NULL, "bummer");
INSERT stamp (id, name) VALUES (NULL, "pien");