DROP TYPE IF EXISTS role;
CREATE TYPE role AS ENUM ('developer', 'product_owner');

DROP TYPE IF EXISTS priority;
CREATE TYPE priority AS ENUM ('high', 'low', 'medium');

DROP TYPE IF EXISTS status;
CREATE TYPE status AS ENUM ('done', 'todo', 'work_in_progress');

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL
) ;

DROP TABLE IF EXISTS e2e_test;
CREATE TABLE e2e_test (
  id SERIAL PRIMARY KEY,
  path varchar(255) NOT NULL 
) ;

DROP TABLE IF EXISTS project;
CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  git_url varchar(255),
  description varchar(2000) DEFAULT NULL,
  creator_id SERIAL REFERENCES "user" (id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS build;
CREATE TABLE build (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  path varchar(255) NOT NULL ,
  size int CHECK (size > 0) NOT NULL DEFAULT '0' ,
  project_id SERIAL REFERENCES project (id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS sprint;
CREATE TABLE sprint (
  id SERIAL PRIMARY KEY,
  start_time timestamp(0) NOT NULL,
  end_time timestamp(0) NOT NULL,
  project_id SERIAL REFERENCES project(id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS task;
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  description varchar(500) DEFAULT NULL,
  status status NOT NULL DEFAULT 'todo',
  developer_id SERIAL REFERENCES "user"(id) ON DELETE CASCADE,
  sprint_id SERIAL REFERENCES sprint(id) ON DELETE CASCADE,
  UNIQUE (developer_id,sprint_id)
) ;

DROP TABLE IF EXISTS user_has_project;
CREATE TABLE user_has_project (
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES "user"(id) ON DELETE CASCADE,
  user_role role NOT NULL DEFAULT 'developer',
  project_id SERIAL REFERENCES project (id) ON DELETE CASCADE,
  UNIQUE (user_id, user_role, project_id)
) ;

DROP TABLE IF EXISTS user_story;
CREATE TABLE user_story (
  id SERIAL PRIMARY KEY,
  description varchar(500) DEFAULT NULL,
  priority priority NOT NULL DEFAULT 'medium',
  points int CHECK(points >= 0) NOT NULL DEFAULT '0',
  status status NOT NULL DEFAULT 'todo',
  project_id SERIAL REFERENCES project(id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS user_story_has_build;
CREATE TABLE user_story_has_build (
  id SERIAL PRIMARY KEY,
  user_story_id SERIAL REFERENCES user_story (id) ON DELETE CASCADE,
  build_id SERIAL REFERENCES build (id) ON DELETE CASCADE,
  UNIQUE (user_story_id, build_id)
) ;

DROP TABLE IF EXISTS user_story_has_e2e_test;
CREATE TABLE user_story_has_e2e_test (
  id SERIAL PRIMARY KEY,
  user_story_id SERIAL REFERENCES user_story(id) ON DELETE CASCADE,
  e2e_test_id SERIAL REFERENCES e2e_test(id) ON DELETE CASCADE,
  UNIQUE (user_story_id, e2e_test_id)
) ;
