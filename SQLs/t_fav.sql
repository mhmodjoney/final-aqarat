DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `favorite_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `real_estate_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NOW(),
  PRIMARY KEY (`favorite_id`),
  KEY `user_id` (`user_id`),
  KEY `real_estate_is` (`real_estate_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estate` (`real_estate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
