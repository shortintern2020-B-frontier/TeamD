DROP PROCEDURE IF EXISTS insert_audience;
DELIMITER //
CREATE PROCEDURE insert_audience(IN room_id INT, IN start_time INT)
DECLARE e INT DEFAULT 0;

BEGIN
  DECLARE end_time INT DEFAULT 0;
  DECLARE end_times CURSOR FOR
    SELECT end_time FROM room WHERE id = room_id;
  OPEN end_times;
  FETCH end_times INTO end_time;
  CLOSE end_times;

  DECLARE i INT DEFAULT start_time DIV 60000;
  WHILE i < (end_time DIV 60000)+1 DO
    INSERT audience (room_id, ellapsed_time, count) VALUES(room_id, i*60000, 0);
  END WHILE;
END//
DELIMITER ;


call insert_audience(1, 120000);
call insert_audience(2, 60000);