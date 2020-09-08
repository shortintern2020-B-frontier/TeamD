CREATE TABLE audience (
  room_id INT UNSIGNED,
  ellapsed_time INT NOT NULL,
  count INT NOT NULL default 0,
  FOREIGN KEY (room_id) REFERENCES room(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT audience (room_id, ellapsed_time, count) VALUES (1, 0, 3);
INSERT audience (room_id, ellapsed_time, count) VALUES (1, 60000, 6);
INSERT audience (room_id, ellapsed_time, count) VALUES (2, 0, 20);