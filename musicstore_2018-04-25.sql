# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.6.38)
# Database: musicstore
# Generation Time: 2018-04-25 06:00:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table songs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `songs`;

CREATE TABLE `songs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `artist` varchar(100) NOT NULL DEFAULT '',
  `album` varchar(100) NOT NULL DEFAULT '',
  `latest` tinyint(1) NOT NULL,
  `Genre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;

INSERT INTO `songs` (`id`, `name`, `artist`, `album`, `latest`, `Genre`)
VALUES
	(1,'Zinda','Farhaan Akthar','Bhaag Milka Bhaag',1,'Rock'),
	(2,'Embrace','Armin Van Buuren','Embrace',0,'Electronic'),
	(3,'Intense','Armin Van Buuren','Embrace',1,'Electronic'),
	(4,'This is what it feels like','Armin Van Buuren','Embrace',0,'Electronic'),
	(5,'Beautiful Life','Armin Van Buuren','embrace',0,'Electronic'),
	(6,'Waiting For The Night','Armin Van Buuren','embrace',0,'Electronic'),
	(7,'The Nights','Avicii','The Nights',1,'Electronic'),
	(8,'Reprise','Armin Van Buuren','embrace',1,'Electronic'),
	(9,'For A Better Day','Avicii','Stories',0,'Electronic'),
	(10,'Ten more days','Avicii','Stories',1,'Electronic'),
	(11,'Hello','Adele','25',1,'Pop'),
	(12,'Rolling in the deep','Adele','21',1,'Pop'),
	(13,'Stairway to heaven','Led Zeppelin','Led Zeppelin IV',0,'Rock'),
	(14,'Sing me to sleep','Alan Walker','Lemon Grass',1,'Electronic'),
	(15,'Faded','Alan Walker','Faded',0,'Electronic'),
	(16,'Hey brother','Avicii','True',0,'Electronic'),
	(17,'All Rise','Blue','All Rise',0,'Pop'),
	(18,'Wake me up','Avicii','True',1,'Electronic'),
	(19,'You make me','Avicii','True',1,'Electronic'),
	(20,'Pulsar','Armin van buuren','embrace',1,'Electronic'),
	(21,'Sound of the drums','Armin van Buuren','embrace',0,'Electronic'),
	(22,'Waiting for the night','Armin van Buuren','embrace',1,'Electronic');

/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userinfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `salt` varchar(200) NOT NULL,
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;

INSERT INTO `userinfo` (`firstname`, `lastname`, `username`, `email`, `password`, `salt`, `userid`, `admin`)
VALUES
	('Rohith','Isukapalli','rohithdot','rohithdot@live.com','69cf4290ff2d7b038f92f6d65424ba2e012765435ec747dc656eecfade85b0a8','$2y$10$WYBfo8ZTpBlptCCkRu5/Pu8IOz2SNDq80GXk75OU8hb1IfvX1gStO',1,0),
	('Shiva','Chawala','Shivachawala','shivachawala@gmail.com','55ca187ce7092c4fda83b7cd0e8e313efb1d15600807fbf30d02c56399ed275f','$2y$10$/emLFsYClEvBjH/ZrlJ2Zult.Edj3WJfKO1CmXI5Z8oPZtG.AX9TW',2,0),
	('Praveen','Reddy','praveen','praveen@gmail.com','71635fb4cbb5c6909492f256b8868b7f6a7872448748f6afb1868e3d4cb50645','$2y$10$/ONtB3/jaPhgepp85yi1LuOzaj.zLK8H3LprHJ9TN/fHkvx6MaYR2',13,0),
	('Hima','Sagar','sagar','sagar@gmail.com','0b8dca3d5e0c7c5076efb4e6edc556b49bf680f3c64858e54c297e23f5e6e085','$2y$10$ILRhG4SwY83OVHB8i6JXeuOXnebaqcIiDkQCjCBow0tRF0Y1z88cO',14,0),
	('rohith','Isukapalli','rohithadmin','rohithdot@live.in','36562d7daf160812a06a94593afdc61485190e1369b433f11e1754d34a6d7f0f','$2y$10$61FF1G.XUaK1iFWrGfLpuuGBmEj6NxtZgujMWRA3ZIgZJVbrbsK7G',15,1),
	('Karan','Kanani','karan','karanykanani@gmail.com','6701abd54c0a8cc8f226448df33f96a135a347eb4555b91dcb5478e418e8757c','$2y$10$fn1JEF4bqm9m7sZJzVZL1es92XDG.juIseTokQTELeZOjNtnfVDi6',16,1);

/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table usermusic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usermusic`;

CREATE TABLE `usermusic` (
  `userid` int(10) NOT NULL,
  `songid` int(10) unsigned NOT NULL,
  `favourite` tinyint(1) NOT NULL,
  KEY `useridconstraint` (`userid`),
  KEY `songidconstraint` (`songid`),
  CONSTRAINT `songidconstraint` FOREIGN KEY (`songid`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridconstraint` FOREIGN KEY (`userid`) REFERENCES `userinfo` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `usermusic` WRITE;
/*!40000 ALTER TABLE `usermusic` DISABLE KEYS */;

INSERT INTO `usermusic` (`userid`, `songid`, `favourite`)
VALUES
	(1,1,0),
	(1,11,1),
	(1,19,0),
	(1,12,0),
	(1,20,0),
	(2,14,0),
	(2,3,0),
	(2,12,0),
	(2,10,0),
	(2,8,0),
	(2,19,0),
	(1,10,0),
	(1,8,0),
	(1,3,0),
	(1,18,0),
	(16,1,0),
	(16,3,0),
	(15,19,0),
	(15,20,0);

/*!40000 ALTER TABLE `usermusic` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
