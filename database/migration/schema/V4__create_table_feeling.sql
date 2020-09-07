# Written by Taishi Hosokawa
CREATE TABLE feeling (
  stamp_id INT UNSIGNED,
  room_id INT UNSIGNED, 
  ellapsed_time INT,
  ctime TIMESTAMP default CURRENT_TIMESTAMP,
  FOREIGN KEY (stamp_id) REFERENCES stamp(id),
  FOREIGN KEY (room_id) REFERENCES room(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT feeling (stamp_id, room_id, ellapsed_time) VALUES (1, 1, 3);
INSERT feeling (stamp_id, room_id, ellapsed_time) VALUES (2, 1, 6);
INSERT feeling (stamp_id, room_id, ellapsed_time) VALUES (3, 2, 20);