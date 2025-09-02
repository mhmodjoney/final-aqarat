DROP TABLE IF EXISTS `ads`;
CREATE TABLE `ads` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `description` text,
  `price` decimal(20,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `sub_category` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'available',
  `created_by` varchar(50) DEFAULT NULL,
  `last_updated_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NOW(),
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`ad_id`),
  KEY `user_id` (`user_id`),
  KEY `idx_ads_price` (`price`),
  KEY `idx_ads_created_date` (`created_date`),
  CONSTRAINT `ads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
