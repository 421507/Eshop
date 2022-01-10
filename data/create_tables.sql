-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: eshop
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `diachi`
--
USE bk1zorhoargullwi7van;
DROP TABLE IF EXISTS `diachi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diachi` (
  `id_diachi` int NOT NULL AUTO_INCREMENT,
  `so_nha` varchar(45) DEFAULT NULL,
  `ten_duong` varchar(45) DEFAULT NULL,
  `phuong` varchar(45) DEFAULT NULL,
  `quan` varchar(45) DEFAULT NULL,
  `thanh_pho` varchar(45) DEFAULT NULL,
  `tinh` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_diachi`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohang` (
  `id_giohang` int NOT NULL AUTO_INCREMENT,
  `id_khachhang` int NOT NULL,
  `id_diachi` int DEFAULT NULL,
  `tong_tien` float DEFAULT '0',
  `ngay_dat` datetime DEFAULT NULL,
  `check_out` tinyint DEFAULT '0',
  `phuongthuc_thanhtoan` varchar(45) DEFAULT NULL,
  `trangthai_thanhtoan` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_giohang`),
  KEY `iddiachi_idx` (`id_diachi`),
  KEY `id_khachhang_idx` (`id_khachhang`),
  CONSTRAINT `id_khachhang` FOREIGN KEY (`id_khachhang`) REFERENCES `khachhang` (`id_khachhang`),
  CONSTRAINT `iddiachi` FOREIGN KEY (`id_diachi`) REFERENCES `diachi` (`id_diachi`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `giohangchitiet`
--

DROP TABLE IF EXISTS `giohangchitiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohangchitiet` (
  `id_giohangchitiet` int NOT NULL AUTO_INCREMENT,
  `id_giohang` int NOT NULL,
  `id_sanpham` int NOT NULL,
  `gia` float DEFAULT NULL,
  `soluong` int DEFAULT NULL,
  `ten_sanpham` varchar(200) DEFAULT NULL,
  `thumbnail` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_giohangchitiet`),
  KEY `id_spham_idx` (`id_sanpham`),
  KEY `fk_giohangchitiet_giohang1_idx` (`id_giohang`),
  CONSTRAINT `fk_giohangchitiet_giohang1` FOREIGN KEY (`id_giohang`) REFERENCES `giohang` (`id_giohang`),
  CONSTRAINT `id_spham` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gop_y`
--

DROP TABLE IF EXISTS `gop_y`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gop_y` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `message` varchar(500) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `reply` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group_user`
--

DROP TABLE IF EXISTS `group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gruser_user_idx` (`user_id`),
  KEY `fk_gruser_group_idx` (`group_id`),
  CONSTRAINT `fk_gruser_group` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`),
  CONSTRAINT `fk_gruser_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hinhanh`
--

DROP TABLE IF EXISTS `hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinhanh` (
  `id_hinhanh` int NOT NULL AUTO_INCREMENT,
  `url` varchar(100) DEFAULT NULL,
  `id_sanpham` int DEFAULT NULL,
  PRIMARY KEY (`id_hinhanh`),
  KEY `idsanpham_idx` (`id_sanpham`),
  CONSTRAINT `idsanpham` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `id_khachhang` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(45) DEFAULT NULL,
  `ten` varchar(100) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_khachhang`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khachhang_present`
--

DROP TABLE IF EXISTS `khachhang_present`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang_present` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_khachhang` int DEFAULT NULL,
  `id_present` int DEFAULT NULL,
  `trang_thai` varchar(45) DEFAULT NULL,
  `slug_trangthai` varchar(45) DEFAULT NULL,
  `loai` varchar(45) DEFAULT NULL,
  `id_giohang` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_khachhang_idx` (`id_khachhang`),
  KEY `fk_present_idx` (`id_present`),
  KEY `fk_khpresent_giohang_idx` (`id_giohang`),
  CONSTRAINT `fk_khachhang` FOREIGN KEY (`id_khachhang`) REFERENCES `khachhang` (`id_khachhang`),
  CONSTRAINT `fk_khpresent_giohang` FOREIGN KEY (`id_giohang`) REFERENCES `giohang` (`id_giohang`),
  CONSTRAINT `fk_present` FOREIGN KEY (`id_present`) REFERENCES `present` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loaisanpham`
--

DROP TABLE IF EXISTS `loaisanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaisanpham` (
  `id_loaisp` int NOT NULL AUTO_INCREMENT,
  `ten_loaisp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_loaisp`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loaisp_thuonghieu`
--

DROP TABLE IF EXISTS `loaisp_thuonghieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaisp_thuonghieu` (
  `id_loaisp_th` int NOT NULL AUTO_INCREMENT,
  `id_loaisp` int DEFAULT NULL,
  `id_thuonghieu` int DEFAULT NULL,
  `ten_thuonghieu` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_loaisp_th`),
  KEY `fk_lspth_loaisp_idx` (`id_loaisp`),
  KEY `fk_lspth_thuonghieu_idx` (`id_thuonghieu`),
  CONSTRAINT `fk_lspth_loaisp` FOREIGN KEY (`id_loaisp`) REFERENCES `loaisanpham` (`id_loaisp`),
  CONSTRAINT `fk_lspth_thuonghieu` FOREIGN KEY (`id_thuonghieu`) REFERENCES `thuonghieu` (`id_thuonghieu`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phuongthucthanhtoan`
--

DROP TABLE IF EXISTS `phuongthucthanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuongthucthanhtoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(200) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `present`
--

DROP TABLE IF EXISTS `present`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `present` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(500) DEFAULT NULL,
  `ngay_batdau` datetime DEFAULT NULL,
  `ngay_ketthuc` datetime DEFAULT NULL,
  `so_luong` int DEFAULT '0',
  `so_tien` int DEFAULT '0',
  `loai` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `idreview` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_sanpham` int NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `rating` int DEFAULT '0',
  PRIMARY KEY (`idreview`),
  KEY `fk_review_sanpham_idx` (`id_sanpham`),
  CONSTRAINT `fk_review_sanpham` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `id_sanpham` int NOT NULL AUTO_INCREMENT,
  `ten_sanpham` varchar(45) DEFAULT NULL,
  `gia_sanpham` float DEFAULT NULL,
  `mieuta` varchar(500) DEFAULT NULL,
  `soluong_tonkho` int DEFAULT NULL,
  `ngay_list` datetime DEFAULT CURRENT_TIMESTAMP,
  `soluong_daban` int DEFAULT '0',
  `mau_sac` varchar(10) DEFAULT NULL,
  `size` varchar(5) DEFAULT NULL,
  `id_thuonghieu` int DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `id_loaisp` int DEFAULT NULL,
  PRIMARY KEY (`id_sanpham`),
  KEY `fk_sanpham_thuonghieu1_idx` (`id_thuonghieu`),
  KEY `fk_sanpham_loaisp_idx` (`id_loaisp`),
  CONSTRAINT `fk_sanpham_loaisp` FOREIGN KEY (`id_loaisp`) REFERENCES `loaisanpham` (`id_loaisp`),
  CONSTRAINT `fk_sanpham_thuonghieu1` FOREIGN KEY (`id_thuonghieu`) REFERENCES `thuonghieu` (`id_thuonghieu`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sanphamgiamgia`
--

DROP TABLE IF EXISTS `sanphamgiamgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanphamgiamgia` (
  `id_sanpham_giamgia` int NOT NULL AUTO_INCREMENT,
  `id_sanpham` int DEFAULT NULL,
  `gia_giam` float DEFAULT NULL,
  `ngay_batdau` datetime DEFAULT NULL,
  `ngay_ketthuc` datetime DEFAULT NULL,
  `gia_saukhigiam` float DEFAULT NULL,
  PRIMARY KEY (`id_sanpham_giamgia`),
  KEY `id_sanpham_idx` (`id_sanpham`),
  CONSTRAINT `id_sanpham` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping`
--

DROP TABLE IF EXISTS `shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping` (
  `id_shipping` int NOT NULL AUTO_INCREMENT,
  `ten_shipper` varchar(45) DEFAULT NULL,
  `trang_thai` int NOT NULL,
  `ngay_nhan` datetime DEFAULT CURRENT_TIMESTAMP,
  `ngay_ketthuc` datetime DEFAULT NULL,
  `gia` float DEFAULT '0',
  `id_giohang` int DEFAULT NULL,
  `mieu_ta` varchar(500) DEFAULT NULL,
  `id_diachi` int DEFAULT NULL,
  PRIMARY KEY (`id_shipping`),
  KEY `fk_shipping_trangthai_idx` (`trang_thai`),
  KEY `fk_shipping_giohang_idx` (`id_giohang`),
  KEY `fk_shipping_diachi_idx` (`id_diachi`),
  CONSTRAINT `fk_shipping_diachi` FOREIGN KEY (`id_diachi`) REFERENCES `diachi` (`id_diachi`),
  CONSTRAINT `fk_shipping_giohang` FOREIGN KEY (`id_giohang`) REFERENCES `giohang` (`id_giohang`),
  CONSTRAINT `fk_shipping_trangthai` FOREIGN KEY (`trang_thai`) REFERENCES `trangthaigiaohang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `thanhpho`
--

DROP TABLE IF EXISTS `thanhpho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanhpho` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_thanhpho` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `gia_ship` float NOT NULL,
  `slug` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `zipcode_UNIQUE` (`zipcode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `theodoi`
--

DROP TABLE IF EXISTS `theodoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theodoi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) DEFAULT NULL,
  `id_sanpham` int DEFAULT NULL,
  `solanxem` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_theodoi_sanpham_idx` (`id_sanpham`),
  CONSTRAINT `fk_theodoi_sanpham` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `thuonghieu`
--

DROP TABLE IF EXISTS `thuonghieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuonghieu` (
  `id_thuonghieu` int NOT NULL AUTO_INCREMENT,
  `ten_thuonghieu` varchar(45) DEFAULT NULL,
  `so_sanpham` int DEFAULT '0',
  PRIMARY KEY (`id_thuonghieu`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trangthaigiaohang`
--

DROP TABLE IF EXISTS `trangthaigiaohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trangthaigiaohang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_trangthai` varchar(45) NOT NULL,
  `slug` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trangthaithanhtoan`
--

DROP TABLE IF EXISTS `trangthaithanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trangthaithanhtoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(45) DEFAULT NULL,
  `slug` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `cong_ty` varchar(45) DEFAULT NULL,
  `ten` varchar(45) DEFAULT NULL,
  `id_diachi` int DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `id_diachi_idx` (`id_diachi`),
  CONSTRAINT `id_diachi` FOREIGN KEY (`id_diachi`) REFERENCES `diachi` (`id_diachi`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usernotactive`
--

DROP TABLE IF EXISTS `usernotactive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usernotactive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_sanpham` int DEFAULT NULL,
  `so_luong` int DEFAULT '0',
  `id_present` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_voucher_present_idx` (`id_present`),
  KEY `fk_voucher_product_idx` (`id_sanpham`),
  CONSTRAINT `fk_voucher_present` FOREIGN KEY (`id_present`) REFERENCES `present` (`id`),
  CONSTRAINT `fk_voucher_product` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-09 20:23:53
