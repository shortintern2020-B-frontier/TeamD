CREATE TABLE room (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  end_time INT,
  ctime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT room (id, title, image_url, end_time) VALUES (NULL, "FIFA World Cup", "https://pictkan.com/uploads/cache/1126823654/football-689262_1920-400x270-MM-100.jpg", 7200000);
INSERT room (id, title, image_url, end_time) VALUES (NULL, "巨人vs阪神", "https://pictkan.com/uploads/cache/2993133857/baseball-636802-225x150-MM-100.jpg", 9000000);