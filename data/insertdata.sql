﻿--
-- Script was generated by Devart dbForge Studio 2020 for MySQL, Version 9.0.338.0
-- Product Home Page: http://www.devart.com/dbforge/mysql/studio
-- Script date 1/9/2022 12:23:29 PM
-- Target server version: 8.0.27
-- Target connection string: User Id=root;Host=localhost;Character Set=utf8
--



SET NAMES 'utf8';
USE eshop;
--
-- Delete data from the table 'loaisp_thuonghieu'
--
TRUNCATE TABLE loaisp_thuonghieu;
--
-- Delete data from the table 'sanpham'
--
DELETE FROM sanpham;
--
-- Delete data from the table 'thuonghieu'
--
DELETE FROM thuonghieu;
--
-- Delete data from the table 'loaisanpham'
--
DELETE FROM loaisanpham;

--
-- Inserting data into table loaisanpham
--
INSERT INTO loaisanpham(id_loaisp, ten_loaisp) VALUES
(1, 'Quần Kaki'),
(2, 'Áo thể thao'),
(3, 'Giày'),
(4, 'Mũ'),
(5, 'Áo khoác'),
(6, 'Áo sơmi nam'),
(7, 'Áo thun'),
(8, 'Quần dài'),
(9, 'Quần short'),
(10, 'Áo sơmi nữ');

--
-- Inserting data into table thuonghieu
--
INSERT INTO thuonghieu(id_thuonghieu, ten_thuonghieu) VALUES
(1, 'Viet Nam CLC'),
(2, 'Gucci'),
(3, 'Prada'),
(4, 'Hang nhap khau'),
(5, 'Burberry'),
(6, 'Zara'),
(7, 'Chanel'),
(8, 'Louis Vuitton'),
(9, 'Dior'),
(10, 'Sida'),
(11, 'Fashion');

-- Inserting data into table sanpham
--
INSERT INTO sanpham(id_sanpham, ten_sanpham, gia_sanpham, mieuta, soluong_tonkho, ngay_list, soluong_daban, mau_sac, size, thumbnail, id_loaisp, id_thuonghieu) VALUES
(1, 'Áo somi ngắn tay', 19, 'v.v', 31372, '1979-06-06 22:56:25', 90, 'hồng', 'XS', '/images/subphotos-1641601562058.png', 18, 26),
(2, 'Áo thun tay dài', 27, 'v.v', 88, '1970-01-01 00:01:29', 108, 'đen', '56', '/images/subphotos-1641601562058.png', 19, 27),
(3, 'Quần Tây Âu', 92, 'v.v', 53348, '2002-09-03 21:54:17', 4011, 'trắng', 'XS', '/images/subphotos-1641601562058.png', 30, 28),
(4, 'Quần Jean', 48, 'v.v', 53, '1970-01-01 00:00:54', 100, 'đen', 'XXL', '/images/subphotos-1641601562058.png', 18, 29),
(5, 'Áo khoác chống nắng', 27, 'v.v', 79055, '2017-06-05 10:01:31', 5128, 'nâu', 'L', '/images/subphotos-1641601562058.png', 32, 30),
(6, 'Áo somi dài tay', 99, 'v.v', 19828, '1997-03-29 06:25:06', 61548, 'nâu', '48', '/images/subphotos-1641601562058.png', 26, 36),
(7, 'Áo somi nam tính', 11, NULL, 56296, '1981-09-07 23:10:32', NULL, 'xanh', 'XS', '/images/subphotos-1641601562058.png', 23, 40),
(8, 'Quần Jean xanh nam', 36, 'v.v', 38545, '2003-03-06 14:52:03', 196, 'xanh', 'M', '/images/subphotos-1641601562058.png', 24, 45),
(9, 'Áo Thun co dãn', 55, 'v.v', 72418, '1982-12-13 09:59:14', 7, 'hồng', '34', '/images/subphotos-1641601562058.png', 26, 32),
(10, 'Áo dài tay nam tính', 27, 'v.v', 28512, '2004-07-25 18:28:39', 47890, 'vàng', 'XL', '/images/subphotos-1641601562058.png', 27, 36),
(11, 'Áo Thun Trắng xinh', 30, 'v.v', 10000, '2004-07-25 18:28:39', 73574, 'trắng', 'XL', '/images/subphotos-1641601562058.png', 21, 28),
(12, 'Áo khoác nữ xinh', 58, 'v.v', 59673, '1970-02-18 16:23:50', 8, 'vàng', '38', '/images/subphotos-1641601562058.png', 20, 41),
(13, 'Áo Thun nam nữ', 69, 'v.v', 99115, '1987-09-29 04:46:55', 2516, 'đỏ', 'XL', '/images/subphotos-1641601562058.png', 21, 35),
(14, 'Áo dài tay phong cách', 69, 'v.v', 71318, '1977-08-16 01:40:39', 6763, 'xanh', 'XL', '/images/subphotos-1641601562058.png', 28, 41),
(15, 'Áo khoác đẹp', 91, 'v.v', 88800, '1976-04-06 17:07:37', 37741, 'nâu', 'L', '/images/subphotos-1641601562058.png', 30, 28),
(16, 'Áo somi kẻ sọc', 27, 'v.v', 86085, '1985-03-25 16:01:40', 77748, NULL, 'XL', '/images/subphotos-1641601562058.png', 33, 29),
(17, 'Quần short nam', 94, 'v.v', 204, '2005-09-19 22:27:06', 74715, 'xanh', 'S', '/images/subphotos-1641601562058.png', 34, 28),
(18, 'Quần short co dãn', 91, 'v.v', 45490, '1970-12-31 14:26:35', 28273, 'đen', '46', '/images/subphotos-1641601562058.png', 35, 32),
(19, 'Quần Jean rách đẹp', 18, 'v.v', 85325, '2007-10-22 22:32:27', 19213, 'nâu', 'XL', '/images/subphotos-1641601562058.png', 33, 33),
(20, 'Giày nam sành điệu', 20, 'v.v', 2553, '2004-08-19 16:40:58', 66442, 'trắng', '58', '/images/subphotos-1641601562058.png', 31, 34),
(21, 'Áo somi trắng tinh', 85, 'v.v', 491, '2013-07-18 10:54:05', 96609, 'trắng', 'M', '/images/subphotos-1641601562058.png', 30, 35),
(22, 'Quần ngắn nam', 60, 'v.v', 98965, '1978-10-15 06:19:50', 98138, 'trắng', 'XL', '/images/subphotos-1641601562058.png', 21, 36),
(23, 'Áo khoác Hàn Quốc', 50, 'v.v', 10000, NULL, 192, 'đen', 'XL', '/images/subphotos-1641601562058.png', 20, 37),
(24, 'Quần Jean đen', 78, 'v.v', 76869, '2014-03-12 23:58:10', 2994, 'đen', 'L', '/images/subphotos-1641601562058.png', 25, 35),
(25, 'Áo sơmi nữ Hàn Quốc', 84, 'v.v', 38365, '1979-09-08 21:05:00', 19167, 'vàng', 'XL', '/images/subphotos-1641601562058.png', 30, 31),
(26, 'Áo sơmi nữ xinh', 111, 'v.v', 10503, '2007-06-04 14:00:14', 76125, 'xanh', '50', '/images/subphotos-1641601562058.png', 32, 34),
(27, 'Quần Jean nữ', 53, 'v.v', 76938, '2007-04-07 16:36:07', 100, 'hồng', '42', '/images/subphotos-1641601562058.png', 28, 39),
(28, 'Áo khoác Nam nữ rộng', 60, 'v.v', 7675, '2000-09-28 12:33:34', 94143, 'hồng', 'S', '/images/subphotos-1641601562058.png', 20, 40),
(29, 'Áo Thun Freesize', 61, 'v.v', 10000, '1970-01-01 00:00:04', 15906, 'xanh', 'XL', '/images/subphotos-1641601562058.png', 19, 29),
(30, 'Quần ngắn đỏ', 251, 'v.v', 62127, '2003-11-10 13:49:06', 46444, 'đỏ', 'S', '/images/subphotos-1641601562058.png', 21, 32),
(31, 'Áo khoác jace', 60, 'v.v', 1267, '1970-01-01 00:21:08', 36396, 'trắng', 'L', '/images/subphotos-1641601562058.png', 19, 29),
(32, 'Quần dài đẹp', 65, 'v.v', 9205, '1975-09-25 17:31:56', 11057, 'đỏ', '48', '/images/subphotos-1641601562058.png', 25, 26),
(33, 'Áo Thun tinh tế', 98, 'v.v', 47966, '1974-06-28 14:07:49', 1000, 'nâu', 'XL', '/images/subphotos-1641601562058.png', 19, 27),
(34, 'Quần dài đẹp', 40, 'v.v', 1000, '1974-06-28 14:07:49', 100, 'đỏ', 'S', '/images/subphotos-1641601562058.png', 20, 36),
(35, 'Áo ngắn tay cute', 21, 'v.v', 78599, '2010-09-05 23:32:04', 37943, 'nâu', 'XS', '/images/subphotos-1641601562058.png', 20, 47),
(36, 'Quần dài quý ông', 93, NULL, 6000, '1970-01-01 00:00:07', NULL, 'hồng', 'XS', '/images/subphotos-1641601562058.png', 20, 45),
(37, 'Áo ngắn tay cute', 37, 'v.v', 43596, '2012-04-02 09:04:04', 78870, 'vàng', '36', '/images/subphotos-1641601562058.png', 16, 46),
(38, 'Áo Thun sắc màu', 55, 'v.v', 31623, '2012-12-09 00:00:43', 39711, 'đen', 'L', '/images/subphotos-1641601562058.png', 18, 26),
(39, 'Áo khoác cute', 49, 'v.v', 37371, '2016-07-28 02:45:45', 87393, NULL, 'S', '/images/subphotos-1641601562058.png', 19, 48),
(40, 'Áo dài tay nam tính', 217, 'v.v', 6396, '1970-01-01 01:46:37', 12685, 'vàng', '40', '/images/subphotos-1641601562058.png', 22, 40),
(41, 'Quần dài sành điệu', 48, 'v.v', 532, '1970-01-01 00:08:53', NULL, 'đỏ', 'XL', '/images/subphotos-1641601562058.png', 34, 36),
(42, 'Áo ngắn tay đẹp', 61, 'v.v', 45824, '2014-08-31 21:50:02', 1, 'đỏ', '54', '/images/subphotos-1641601562058.png', 19, 29),
(43, 'Quần ngắn xịn', 52, 'v.v', 80000, '1970-01-01 00:00:09', 0, 'xanh', 'XXL', '/images/subphotos-1641601562058.png', 18, 30),
(44, 'Áo Thun xịn', 44, 'v.v', 30816, '1978-02-14 06:18:58', 43861, 'đen', 'M', '/images/subphotos-1641601562058.png', 19, 36),
(45, 'Áo dài tay dày dặn', 27, 'v.v', 25307, '1974-10-26 08:26:35', 51106, 'nâu', 'XS', '/images/subphotos-1641601562058.png', 21, 28),
(46, 'Áo Thun nữ tính', 68, 'v.v', 31160, '1970-01-01 00:51:57', 9, 'đỏ', '52', '/images/subphotos-1641601562058.png', 18, 32),
(47, 'Áo ngắn tay caro', 51, 'v.v', 22636, '2001-05-08 15:54:06', 59531, NULL, 'XS', '/images/subphotos-1641601562058.png', 19, 41),
(48, 'Áo dài tay freesize', 63, 'v.v', 36311, '2017-07-02 10:29:02', 3121, 'vàng', 'XL', '/images/subphotos-1641601562058.png', 22, 36),
(49, 'Áo Thun đỏ', 90, 'v.v', 65130, '1988-09-05 12:34:17', 28886, 'nâu', 'S', '/images/subphotos-1641601562058.png', 22, 26),
(50, 'Áo somi sọc', 38, 'v.v', 86803, '1970-02-05 16:39:19', 15265, 'đỏ', 'L', '/images/subphotos-1641601562058.png', 31, 30);

--
-- Inserting data into table loaisp_thuonghieu
--
INSERT INTO loaisp_thuonghieu(id_loaisp_th, id_loaisp, id_thuonghieu, ten_thuonghieu) VALUES
(1, 1, 1, 'Viet Nam CLC'),
(2, 1, 2, 'Gucci'),
(3, 1, 3, 'Prada'),
(4, 1, 4, 'Hàng nhập khẩu'),
(5, 2, 6, 'Zara'),
(6, 2, 10, 'Sida'),
(7, 3, 5, 'Burberry'),
(8, 5, 1, 'Viet Nam CLC'),
(9, 4, 6, 'Zara'),
(10, 4, 2, 'Gucci'),
(11, 6, 4, 'Hang nhap khau'),
(12, 7, 7, 'Chanel'),
(13, 7, 9, 'Dior'),
(14, 8, 4, 'Hang nhap khau'),
(15, 8, 1, 'Viet Nam CLC'),
(16, 9, 2, 'Gucci'),
(17, 10, 2, 'Gucci'),
(18, 10, 4, 'Hang nhap khau');
