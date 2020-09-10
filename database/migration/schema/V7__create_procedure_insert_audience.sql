# Written by Taishi Hosokawa
DROP PROCEDURE IF EXISTS insert_audience;
DELIMITER //
CREATE PROCEDURE insert_audience(IN room_id INT, IN start_time INT)

BEGIN
  DECLARE target_ellapsed_time INT DEFAULT start_time;
  DECLARE end_time INT DEFAULT 0;
  DECLARE cursor_end_time CURSOR FOR
    SELECT roomA.end_time FROM room AS roomA WHERE id = room_id;
  OPEN cursor_end_time;
  FETCH cursor_end_time INTO end_time;
  CLOSE cursor_end_time;

  WHILE target_ellapsed_time <= end_time DO
    INSERT audience (room_id, ellapsed_time, count) VALUES(room_id, target_ellapsed_time, 0);
    set target_ellapsed_time = target_ellapsed_time + 60000;
  END WHILE;
COMMIT;
END//
DELIMITER ;


call insert_audience(1, 120000);
call insert_audience(2, 60000);