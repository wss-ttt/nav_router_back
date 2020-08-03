/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : nav_router_back

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2020-08-03 22:38:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` char(2) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin', '男', '18');
