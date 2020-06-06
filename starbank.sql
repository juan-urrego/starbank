CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `ahorro`
--

DROP TABLE IF EXISTS `ahorro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ahorro` (
  `id_ahorro` int NOT NULL AUTO_INCREMENT,
  `intereses` decimal(10,0) DEFAULT NULL,
  `cuentas_id_cuenta` int DEFAULT NULL,
  PRIMARY KEY (`id_ahorro`),
  KEY `ahorro-cuenta_idx` (`cuentas_id_cuenta`),
  CONSTRAINT `ahorro-cuenta` FOREIGN KEY (`cuentas_id_cuenta`) REFERENCES `cuenta` (`id_cuenta`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ahorro`
--

LOCK TABLES `ahorro` WRITE;
/*!40000 ALTER TABLE `ahorro` DISABLE KEYS */;
INSERT INTO `ahorro` VALUES (1,30,3),(2,30,1);
/*!40000 ALTER TABLE `ahorro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cajero`
--

DROP TABLE IF EXISTS `cajero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cajero` (
  `id_cajero` int NOT NULL AUTO_INCREMENT,
  `direccion` varchar(45) DEFAULT NULL,
  `sucursal_id_sucursal` int DEFAULT NULL,
  PRIMARY KEY (`id_cajero`),
  KEY `cajero-sucursal_idx` (`sucursal_id_sucursal`),
  CONSTRAINT `cajero-sucursal` FOREIGN KEY (`sucursal_id_sucursal`) REFERENCES `sucursal` (`id_sucursal`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cajero`
--

LOCK TABLES `cajero` WRITE;
/*!40000 ALTER TABLE `cajero` DISABLE KEYS */;
INSERT INTO `cajero` VALUES (1,'78',1),(2,'dsfsdaf',1),(3,'fsadf',1);
/*!40000 ALTER TABLE `cajero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `ocupacion` varchar(45) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'juan','estudiante',215498754),(2,'marcos','profesor',6874),(3,'daniel','proge',21348),(4,'juanjo','fsadf',5848),(5,'pedro','354',38484),(40,'hjgjfgj','hgjfgj',7868),(41,'jkhk','ghkghk',89879),(42,'juan jose urrego','sdfgdfsgfd',56456),(43,'jhjhk','hjhkghjk',57878),(44,'fgdfg','fdgfgd',76657),(45,'juan sjadu','sfgfg',456456),(46,'gsdfgsdfg','fdsgdfs',53345),(47,'jhfjhfgj','fgjfgjfg',768768),(48,'jgh','ghj',356),(49,'jgjkj','ghjkghk',879),(50,'nmnnmvhjk','78768',678),(51,'preuba','fgsdfg',63848),(52,'gffggh','df',5656);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corriente`
--

DROP TABLE IF EXISTS `corriente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corriente` (
  `id_corriente` int NOT NULL AUTO_INCREMENT,
  `cuentas_id_cuenta` int DEFAULT NULL,
  PRIMARY KEY (`id_corriente`),
  KEY `corriente-cuenta_idx` (`cuentas_id_cuenta`),
  CONSTRAINT `corriente-cuenta` FOREIGN KEY (`cuentas_id_cuenta`) REFERENCES `cuenta` (`id_cuenta`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corriente`
--

LOCK TABLES `corriente` WRITE;
/*!40000 ALTER TABLE `corriente` DISABLE KEYS */;
INSERT INTO `corriente` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `corriente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `id_cuenta` int NOT NULL AUTO_INCREMENT,
  `titular` varchar(45) DEFAULT NULL,
  `saldo` int DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cliente_id_cliente` int DEFAULT NULL,
  `sucursal_id_sucursal` int DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cuenta`),
  KEY `cliente-cuenta_idx` (`cliente_id_cliente`),
  KEY `sucursal-cuenta_idx` (`sucursal_id_sucursal`),
  CONSTRAINT `cliente-cuenta` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE SET NULL,
  CONSTRAINT `sucursal-cuenta` FOREIGN KEY (`sucursal_id_sucursal`) REFERENCES `sucursal` (`id_sucursal`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` VALUES (1,'banco',300000,'Desactivada',1,1,'ahorro'),(2,'juan',1434315,'Desactivada',1,1,'corriente'),(3,'sadf',65561,'Activada',2,1,'ahorro'),(5,'banco',40000,'Activada',1,1,'Corriente'),(6,'juan desde el front',50000,'Activada',1,1,'Corriente'),(7,'frontend',0,'Desactivada',2,1,'Corriente'),(8,'juan',90000,'Activada',5,1,'Ahorro');
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nit` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `sector` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `cliente_id_cliente` int DEFAULT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `cliente_id_cliente2_idx` (`cliente_id_cliente`),
  CONSTRAINT `empresa-cliente` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (2,'sdfaf','dfasdfasf','fgfag','fgds',4),(3,'dsfasdf','fsdgsdfhg','ghgdf','dfhsghs',5),(4,'fg42','jhcaca','dfsfds','fsdagfg',NULL),(5,'fgh','dfh','fhdfh','fghdfh',NULL);
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operacion`
--

DROP TABLE IF EXISTS `operacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operacion` (
  `id_operacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `hora` varchar(45) DEFAULT NULL,
  `cajero_id_cajero` int DEFAULT NULL,
  `cuenta_id_cuenta` int DEFAULT NULL,
  PRIMARY KEY (`id_operacion`),
  KEY `FK2ml1479lyp8qbtd758k5q8sp9` (`cuenta_id_cuenta`),
  KEY `FKiw4wino01sgt1mjyxbtrgjp2f` (`cajero_id_cajero`),
  CONSTRAINT `FK2ml1479lyp8qbtd758k5q8sp9` FOREIGN KEY (`cuenta_id_cuenta`) REFERENCES `cuenta` (`id_cuenta`) ON DELETE SET NULL,
  CONSTRAINT `FKiw4wino01sgt1mjyxbtrgjp2f` FOREIGN KEY (`cajero_id_cajero`) REFERENCES `cajero` (`id_cajero`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operacion`
--

LOCK TABLES `operacion` WRITE;
/*!40000 ALTER TABLE `operacion` DISABLE KEYS */;
INSERT INTO `operacion` VALUES (1,'retiro','hoy','5',1,1),(2,'retiro','hoy','5',2,1),(3,'actibaar','hoy','5',3,3),(4,'consignacion','5/5/2020','14:34:49',1,1),(5,'consignacion','5/5/2020','14:38:33',1,1),(6,'consignacion','5/5/2020','14:44:34',1,1),(7,'consignacion','5/5/2020','14:47:15',1,1),(8,'consignacion','5/5/2020','14:47:32',1,1),(9,'consignacion','5/5/2020','14:52:41',1,1),(10,'consignacion','5/5/2020','14:59:23',1,2),(11,'retiros','5/5/2020','15:6:15',1,1),(12,'consignacion','5/5/2020','15:11:27',1,1),(13,'consignacion','5/5/2020','15:11:35',1,5),(14,'consignacion','5/5/2020','16:55:35',1,1),(15,'consignacion','5/5/2020','16:55:44',1,1),(16,'consignacion','5/5/2020','16:55:59',1,1),(17,'consignacion','5/5/2020','16:56:49',1,1),(18,'consignacion','5/5/2020','16:57:10',1,1),(19,'consignacion','5/5/2020','17:28:29',1,5),(20,'retiros','5/5/2020','17:28:36',1,2),(21,'consignacion','5/5/2020','17:29:25',2,8);
/*!40000 ALTER TABLE `operacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `direccion` varchar(45) DEFAULT NULL,
  `cliente_id_cliente` int DEFAULT NULL,
  PRIMARY KEY (`id_persona`),
  KEY `cliente-persona_idx` (`cliente_id_cliente`),
  CONSTRAINT `cliente-persona` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'78',1),(2,'50',2),(3,'50',3),(4,'78',NULL),(9,'hgjgj',NULL);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursal` (
  `id_sucursal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `saldo` double DEFAULT NULL,
  PRIMARY KEY (`id_sucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
INSERT INTO `sucursal` VALUES (1,'bancolombia','78','medellin',0);
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-05 22:06:10
