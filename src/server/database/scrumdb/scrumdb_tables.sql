SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DROP TABLE IF EXISTS `build`;
CREATE TABLE `build` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL COMMENT 'Devrait renseigner le nom, la version, l''OS et l''architecture si besoin. ',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Le chemin absolu du fichier.',
  `size` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'La taille en octets.',
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `e2e_test`;
CREATE TABLE `e2e_test` (
  `id` int(10) UNSIGNED NOT NULL,
  `path` varchar(255) NOT NULL COMMENT 'Le chemin absolu du fichier.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `git_url` varchar(255) NOT NULL,
  `description` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `sprint`;
CREATE TABLE `sprint` (
  `id` int(10) UNSIGNED NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` enum('done','todo','work_in_progress') NOT NULL DEFAULT 'todo',
  `developer_id` int(10) UNSIGNED NOT NULL,
  `sprint_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_has_project`;
CREATE TABLE `user_has_project` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_role` enum('developer','product_owner') NOT NULL DEFAULT 'developer',
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_story`;
CREATE TABLE `user_story` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `priority` enum('high','low','medium') NOT NULL DEFAULT 'medium',
  `points` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `status` enum('done','todo','work_in_progress') NOT NULL DEFAULT 'todo',
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_story_has_build`;
CREATE TABLE `user_story_has_build` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_story_id` int(10) UNSIGNED NOT NULL,
  `build_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_story_has_e2e_test`;
CREATE TABLE `user_story_has_e2e_test` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_story_id` int(10) UNSIGNED NOT NULL,
  `e2e_test_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `build`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`name`),
  ADD KEY `project_id_FOREIGN` (`project_id`);

ALTER TABLE `e2e_test`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `git_url_UNIQUE` (`git_url`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

ALTER TABLE `sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id_FOREIGN` (`project_id`);

ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`developer_id`,`sprint_id`),
  ADD KEY `sprint_id_FOREIGN` (`sprint_id`),
  ADD KEY `user_id_FOREIGN` (`developer_id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`name`);

ALTER TABLE `user_has_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`user_id`,`user_role`,`project_id`),
  ADD KEY `user_id_FOREIGN` (`user_id`),
  ADD KEY `project_id_FOREIGN` (`project_id`);

ALTER TABLE `user_story`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id_FOREIGN` (`project_id`);

ALTER TABLE `user_story_has_build`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`user_story_id`,`build_id`),
  ADD KEY `build_id_FOREIGN` (`build_id`),
  ADD KEY `user_story_id_FOREIGN` (`user_story_id`);

ALTER TABLE `user_story_has_e2e_test`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`user_story_id`,`e2e_test_id`),
  ADD KEY `user_story_id_FOREIGN` (`user_story_id`),
  ADD KEY `e2e_test_id_FOREIGN` (`e2e_test_id`);


ALTER TABLE `build`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `e2e_test`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `project`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `sprint`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `task`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `user_has_project`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `user_story`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `user_story_has_build`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `user_story_has_e2e_test`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `build`
  ADD CONSTRAINT `build_fk_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_fk_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `task`
  ADD CONSTRAINT `task_fk_sprint` FOREIGN KEY (`sprint_id`) REFERENCES `sprint` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `task_fk_user` FOREIGN KEY (`developer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `user_has_project`
  ADD CONSTRAINT `user_has_project_fk_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_has_project_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `user_story`
  ADD CONSTRAINT `user_story_fk_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `user_story_has_build`
  ADD CONSTRAINT `user_story_has_build_fk_build` FOREIGN KEY (`build_id`) REFERENCES `build` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_story_has_build_fk_user_story` FOREIGN KEY (`user_story_id`) REFERENCES `user_story` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
