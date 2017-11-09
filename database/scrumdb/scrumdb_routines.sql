-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 09, 2017 at 03:45 PM
-- Server version: 5.5.58-0+deb8u1
-- PHP Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `scrum`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_project`(IN `project_id` INT, IN `name` VARCHAR(20), IN `git_url` VARCHAR(255), IN `description` VARCHAR(2000))
    MODIFIES SQL DATA
BEGIN
    UPDATE `project`
    SET `name` = name, `git_url` = git_url, `description` = description
    WHERE `id` = project_id;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `create_project`(`user_id` INT, `name` VARCHAR(20), `git_url` VARCHAR(255), `description` VARCHAR(2000)) RETURNS int(11)
    MODIFIES SQL DATA
BEGIN
    DECLARE is_name_already_used BOOL;
    DECLARE project_id INT;
    
    SET is_name_already_used = EXISTS(SELECT 1 FROM `project` WHERE project.name = name);
    IF is_name_already_used THEN RETURN 1; END IF;
    
    INSERT INTO `project` (`name`, `git_url`, `description`) VALUES (name, git_url, description);
    SET project_id = LAST_INSERT_ID();
    
    INSERT INTO `user_has_project` (`user_id`, `project_id`) VALUES (user_id, project_id);

    RETURN 0;
END$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
