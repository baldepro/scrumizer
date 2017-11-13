-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 11, 2017 at 05:18 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_projects_from_user`(IN `user_id` INT UNSIGNED)
    READS SQL DATA
SELECT * 
FROM project
INNER JOIN user_has_project ON user_has_project.project_id = project.id
WHERE user_has_project.user_id = user_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_project_from_user`(IN `user_id` INT, IN `project_id` INT)
    NO SQL
SELECT * 
FROM project
INNER JOIN user_has_project ON user_has_project.project_id = project.id
WHERE project.id = project_id AND user_has_project.user_id = user_id$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `create_user_story`(`id` INT, `description` VARCHAR(500)
, `priority` enum('high','low','medium'), `points` INT , 'status' enum('done','todo','work_in_progress') 
, 'project_id' INT; 'e2e_test_id' INT); 
		       RETURNS int(10) unsigned
    MODIFIES SQL DATA
BEGIN
	INSERT INTO `user_story` (`description`, `priority`, `points`, `status`, `project_id, `e2e_test_id`) VALUES (`description`, `priority`, `points`, `status`, `project_id, `e2e_test_id`);

    RETURN (ROW_COUNT() & 1);
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `create_project`(`user_id` INT, `name` VARCHAR(20), `git_url` VARCHAR(255), `description` VARCHAR(2000)) RETURNS int(10) unsigned
    MODIFIES SQL DATA
BEGIN
	INSERT INTO `project` (`name`, `git_url`, `description`, `creator_id`) VALUES (name, git_url, description, user_id);

    RETURN (ROW_COUNT() & 1);
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `delete_project`(`project_id` INT) RETURNS int(10) unsigned
    NO SQL
BEGIN
	DELETE FROM `project` WHERE id = project_id;
    RETURN ROW_COUNT();
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `edit_project`(`project_id` INT, `name` VARCHAR(20), `git_url` VARCHAR(255), `description` VARCHAR(2000)) RETURNS int(10) unsigned
    MODIFIES SQL DATA
BEGIN
	UPDATE `project`
    SET `name` = name, `git_url` = git_url, `description` = description
    WHERE `id` = project_id;
    
    RETURN ROW_COUNT();
END$$

DELIMITER ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `git_url`, `description`, `creator_id`) VALUES
(1, 'monp', 'ji', '', 1),
(2, 'oij', 'uygu', '', 1);

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`) VALUES
(1, 'poioupou');

--
-- Dumping data for table `user_has_project`
--

INSERT INTO `user_has_project` (`id`, `user_id`, `user_role`, `project_id`) VALUES
(1, 1, 'developer', 1),
(2, 1, 'developer', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
