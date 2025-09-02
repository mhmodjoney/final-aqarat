-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: mysql6013.site4now.net    Database: db_abba63_testdb
-- ------------------------------------------------------
-- Server version	5.7.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ads`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads`
--

LOCK TABLES `ads` WRITE;
/*!40000 ALTER TABLE `ads` DISABLE KEYS */;
INSERT INTO `ads` VALUES (1,'Used iPhone 14 Pro','Like new condition with box',3500.00,'AED','Mobiles','iPhone',1,'available','mahmoudj',NULL,'2025-07-14 20:37:34',NULL),(2,'Gaming Laptop','MSI gaming laptop 16GB RAM RTX 3070',7500.00,'AED','Electronics','Laptops',2,'available','saraa',NULL,'2025-07-14 20:37:34',NULL),(3,'Honda Civic 2019','Excellent condition 60k km',52000.00,'AED','Motors','Cars',1,'available','mahmoudj',NULL,'2025-07-14 20:37:34',NULL);
/*!40000 ALTER TABLE `ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ads_views`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads_views`
--

LOCK TABLES `ads_views` WRITE;
/*!40000 ALTER TABLE `ads_views` DISABLE KEYS */;
INSERT INTO `ads_views` VALUES (1,1,1,'192.168.1.10','Chrome on Windows','2025-07-14 20:37:34'),(2,2,2,'192.168.1.20','Safari on Mac','2025-07-14 20:37:34'),(3,3,NULL,'192.168.1.30','Mobile Web','2025-07-14 20:37:34');
/*!40000 ALTER TABLE `ads_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'Summer Offers','https://example.com/banners/summer.jpg','https://dubizzle-clone.com/offers','top','active','2025-07-14 20:37:34',NULL),(2,'Exclusive Deals','https://example.com/banners/deals.jpg','https://dubizzle-clone.com/deals','sidebar','active','2025-07-14 20:37:34',NULL),(3,'Ramadan Specials','https://example.com/banners/ramadan.jpg','https://dubizzle-clone.com/ramadan','bottom','active','2025-07-14 20:37:34',NULL);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,1,1,'2025-07-14 20:37:34'),(2,2,3,'2025-07-14 20:37:34'),(3,1,2,'2025-07-14 20:37:34');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'real_estate',1,'https://example.com/images/villa1.jpg','2025-07-14 20:37:34'),(2,'real_estate',2,'https://example.com/images/studio1.jpg','2025-07-14 20:37:34'),(3,'ads',1,'https://example.com/images/iphone14.jpg','2025-07-14 20:37:34'),(4,'ads',2,'https://example.com/images/laptop.jpg','2025-07-14 20:37:34');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `real_estate`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `real_estate`
--

LOCK TABLES `real_estate` WRITE;
/*!40000 ALTER TABLE `real_estate` DISABLE KEYS */;
INSERT INTO `real_estate` VALUES (3,'Luxury Villa-online','5 BR villa in Palm Jumeirah',8500000.00,'AED',5000,'Palm Jumeirah',1,55.14,25.1,'Dubai','Palm Jumeirah','Villa','Detached','sale',5,6,'{\"pool\": \"private\", \"maid_room\": true}','Frond A','Street 1','available','mahmoudj',NULL,'2025-07-14 20:37:34',NULL),(4,'Studio Apartment','Studio in Downtown',60000.00,'AED',500,'Downtown Dubai',2,55.27,25.19,'Dubai','Downtown','Apartment','Studio','rent',0,1,'{\"pool\": \"private\", \"maid_room\": true}','Burj Area','Boulevard','available','saraa',NULL,'2025-07-14 20:37:34',NULL),(5,'Retail Shop','Shop in Marina Walk',200000.00,'AED',1200,'Marina Walk',1,55.12,25.08,'Dubai','Marina','Commercial','Retail','rent',0,1,'{\"pool\": \"private\", \"maid_room\": true}','Marina Promenade','Main Walk','available','mahmoudj',NULL,'2025-07-14 20:37:34',NULL);
/*!40000 ALTER TABLE `real_estate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;












/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Mahmoud Jouny','971500000001','971500000001','mahmoud@example.com','mahmoudj','pass123','user','active',NULL,'system',NULL,'2025-07-14 20:37:34',NULL),(2,'Sara Ali','971500000002','971500000002','sara@example.com','saraa','pass123','admin','active',NULL,'system',NULL,'2025-07-14 20:37:34',NULL),(3,'Omar Said','971500000003','971500000003','omar@example.com','omarsa','pass123','user','active',NULL,'system',NULL,'2025-07-14 20:37:34',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-20 18:19:08
